import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils';
import { ARBEIDSOKERPERIODER_URL } from '../urls/api';
import fetcher from '../lib/http';

interface ArbeidssokerperioderProviderType {
    arbeidssokerperioder: ArbeidssokerperioderResponse;
}

export const ArbeidssokerperioderContext = createContext<ArbeidssokerperioderProviderType>({
    arbeidssokerperioder: [],
});

function ArbeidssokerperioderProvider(props: { children: ReactNode }) {
    const [arbeidssokerperioder, settArbeidssokerperioder] = useState<ArbeidssokerperioderResponse>([]);

    const hentArbeidssokerperioder = async () => {
        try {
            const oppdaterteArbeidssokerperioder = await fetcher(ARBEIDSOKERPERIODER_URL);
            if (oppdaterteArbeidssokerperioder) {
                settArbeidssokerperioder(oppdaterteArbeidssokerperioder as ArbeidssokerperioderResponse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        hentArbeidssokerperioder();
    }, []);

    const contextValue = {
        arbeidssokerperioder,
    };

    return (
        <ArbeidssokerperioderContext.Provider value={contextValue}>
            {props.children}
        </ArbeidssokerperioderContext.Provider>
    );
}

function useArbeidssokerperioder() {
    const context = useContext(ArbeidssokerperioderContext);

    if (context === undefined) {
        throw new Error('useArbeidssokerperioder må brukes under en ArbeidssokerperioderProvider');
    }
    return context;
}

export { ArbeidssokerperioderProvider, useArbeidssokerperioder };
