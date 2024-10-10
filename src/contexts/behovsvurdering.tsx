import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import fetcher from '../lib/http';
import { BEHOVSVURDERING_URL, OPPRETT_DIALOG_URL } from '../urls/api';

export enum ForeslattInnsatsgruppe {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BEHOV_FOR_ARBEIDSEVNEVURDERING',
}

export type BehovsvurderingRequest = {
    oppfolging: ForeslattInnsatsgruppe;
    tekst?: string;
    overskrift?: string;
    venterPaaSvarFraNav?: boolean;
    profileringId?: string;
};

export type BehovsvurderingResponse = {
    dato?: string;
    oppfolging: ForeslattInnsatsgruppe;
    dialogId?: string;
    profileringId?: string;
} | null;

interface BehovsvurderingProviderType {
    behovForVeiledning: BehovsvurderingResponse;
    lagreBehovsvurdering: (behovForVeiledning: BehovsvurderingRequest) => Promise<void>;
}

export const BehovsvurderingContext = createContext<BehovsvurderingProviderType>({
    behovForVeiledning: null,
    lagreBehovsvurdering: () => Promise.resolve(),
});

async function opprettDialog(data: {
    tekst?: string;
    overskrift?: string;
    venterPaaSvarFraNav?: boolean;
}): Promise<null | { id: string }> {
    if (!data.tekst && !data.overskrift) {
        return Promise.resolve(null);
    }

    return fetcher(OPPRETT_DIALOG_URL, {
        method: 'POST',
        body: JSON.stringify({
            tekst: data.tekst,
            overskrift: data.overskrift,
            venterPaaSvarFraNav: data.venterPaaSvarFraNav,
        }),
    });
}

function BehovsvurderingProvider(props: { children: ReactNode }) {
    const [behovForVeiledning, settBehovForVeiledning] = useState<BehovsvurderingResponse>(null);

    const hentBehovsvurdering = async () => {
        try {
            const behovForVeiledning = await fetcher(BEHOVSVURDERING_URL);
            if (behovForVeiledning) {
                settBehovForVeiledning(behovForVeiledning as BehovsvurderingResponse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const lagreBehovsvurdering = async (data: BehovsvurderingRequest) => {
        try {
            const dialog = await opprettDialog(data);
            const behov: BehovsvurderingResponse = await fetcher(BEHOVSVURDERING_URL, {
                method: 'POST',
                body: JSON.stringify({
                    oppfolging: data.oppfolging,
                    dialogId: dialog?.id,
                    profileringId: data.profileringId,
                }),
            });
            settBehovForVeiledning(behov);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        hentBehovsvurdering();
    }, []);

    const contextValue = {
        behovForVeiledning,
        lagreBehovsvurdering,
    };

    return <BehovsvurderingContext.Provider value={contextValue}>{props.children}</BehovsvurderingContext.Provider>;
}

function useBehovsvurdering() {
    const context = useContext(BehovsvurderingContext);

    if (context === undefined) {
        throw new Error('useBehovsvurdering må brukes under en BehovsvurderingProvider');
    }
    return context;
}

export { BehovsvurderingProvider, useBehovsvurdering };
