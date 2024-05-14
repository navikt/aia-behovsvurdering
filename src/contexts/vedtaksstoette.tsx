import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import fetcher from '../lib/http';
import { VEDTAKSSTOETTE_URL } from '../urls/api';
import { VedtakType } from '../types/vedtak';

export type VedtaksstoetteRespons = VedtakType | null;

interface VedtaksstoetteProviderType {
    siste14avedtak: VedtaksstoetteRespons;
}

export const VedtaksstoetteContext = createContext<VedtaksstoetteProviderType>({
    siste14avedtak: null,
});

function VedtaksstoetteProvider(props: { children: ReactNode }) {
    const [vedtaksstoette, settVedtaksstoette] = useState<VedtaksstoetteRespons>(null);

    const hentSiste14aVedtak = async () => {
        try {
            const vedtaksstoette = await fetcher(VEDTAKSSTOETTE_URL);
            if (vedtaksstoette) {
                settVedtaksstoette(vedtaksstoette as VedtaksstoetteRespons);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        hentSiste14aVedtak();
    }, []);

    const contextValue = {
        siste14avedtak: vedtaksstoette,
    };

    return <VedtaksstoetteContext.Provider value={contextValue}>{props.children}</VedtaksstoetteContext.Provider>;
}

function useVedtaksstoette() {
    const context = useContext(VedtaksstoetteContext);

    if (context === undefined) {
        throw new Error('useVedtaksstoette må brukes under en VedtaksstoetteProvider');
    }
    return context;
}

export { VedtaksstoetteProvider, useVedtaksstoette };
