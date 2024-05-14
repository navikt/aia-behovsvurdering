import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useArbeidssokerperioder } from './arbeidssokerperioder';
import {
    ArbeidssokerperioderResponse,
    hentSisteArbeidssokerPeriode,
    OpplysningerOmArbeidssoker,
    OpplysningerOmArbeidssokerResponse,
} from '@navikt/arbeidssokerregisteret-utils';
import fetcher from '../lib/http';
import { OPPLYSNINGER_OM_ARBEIDSSOKER_URL } from '../urls/api';
import endreOpplysninger from '../lib/endre-opplysninger';
import { LagreOpplysningerPayload, OnOppdaterOpplysninger } from '../types/oppdater-opplysninger';

interface OpplysningerOmArbeidssokerProviderType {
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssokerResponse;
    onOppdaterOpplysninger: OnOppdaterOpplysninger;
}

export const OpplysningerOmArbeidssokerContext = createContext<OpplysningerOmArbeidssokerProviderType>({
    opplysningerOmArbeidssoker: [],
    onOppdaterOpplysninger: () => Promise.resolve(),
});

function OpplysningerOmArbeidssokerProvider(props: { children: ReactNode }) {
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const [opplysningerOmArbeidssoker, settOpplysningerOmArbeidssoker] = useState<OpplysningerOmArbeidssokerResponse>(
        [],
    );

    const hentOpplysningerOmArbeidssoker = async (arbeidssokerperioder: ArbeidssokerperioderResponse) => {
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
        if (periodeId) {
            try {
                const urlForOppdaterteOpplysningerOmArbeidssoker = `${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/${periodeId}`;
                const oppdaterteOpplysningerOmArbeidssoker = await fetcher(urlForOppdaterteOpplysningerOmArbeidssoker);
                if (oppdaterteOpplysningerOmArbeidssoker) {
                    settOpplysningerOmArbeidssoker(
                        oppdaterteOpplysningerOmArbeidssoker as OpplysningerOmArbeidssokerResponse,
                    );
                }
                return oppdaterteOpplysningerOmArbeidssoker;
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onOppdaterOpplysninger: OnOppdaterOpplysninger = useCallback(
        async (
            data: LagreOpplysningerPayload,
            erOpprettOppgaveToggletPaa: boolean,
            opplysninger: OpplysningerOmArbeidssoker,
        ) => {
            await endreOpplysninger(data, erOpprettOppgaveToggletPaa, opplysninger);

            const oppdaterOpplysninger = async (counter: number = 0) => {
                // Litt forsinkelser fra api før oppdaterte opplysninger kommer i responsen
                // refetch opplysninger med litt forsinkelse hvis oppdatering ikke er med i respons
                const oppdaterteOpplysninger = await hentOpplysningerOmArbeidssoker(arbeidssokerperioder);
                if (oppdaterteOpplysninger?.length === opplysningerOmArbeidssoker.length && counter < 3) {
                    setTimeout(() => oppdaterOpplysninger(counter + 1), 2000);
                }
            };

            await oppdaterOpplysninger();
        },
        [arbeidssokerperioder, opplysningerOmArbeidssoker],
    );

    useEffect(() => {
        if (arbeidssokerperioder) {
            hentOpplysningerOmArbeidssoker(arbeidssokerperioder);
        }
    }, [arbeidssokerperioder]);

    const contextValue = {
        opplysningerOmArbeidssoker,
        onOppdaterOpplysninger,
    };

    return (
        <OpplysningerOmArbeidssokerContext.Provider value={contextValue}>
            {props.children}
        </OpplysningerOmArbeidssokerContext.Provider>
    );
}

function useOpplysningerOmArbeidssoker() {
    const context = useContext(OpplysningerOmArbeidssokerContext);

    if (context === undefined) {
        throw new Error('useOpplysningerOmArbeidssoker må brukes under en OpplysningerOmArbeidssokerProvider');
    }
    return context;
}

export { OpplysningerOmArbeidssokerProvider, useOpplysningerOmArbeidssoker };
