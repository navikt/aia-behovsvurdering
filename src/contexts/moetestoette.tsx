import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import fetcher from '../lib/http';
import { MOTESTOTTE_URL } from '../urls/api';

export type MoetestoetteRespons = {
    dato: string;
} | null;

interface MoetestoetteProviderType {
    moetestoette: MoetestoetteRespons;
}

export const MoetestoetteContext = createContext<MoetestoetteProviderType>({
    moetestoette: null,
});

function MoetestoetteProvider(props: { children: ReactNode }) {
    const [moetestoette, settMoetestoette] = useState<MoetestoetteRespons>(null);

    const hentMoetestoette = async () => {
        try {
            const moetestoette = await fetcher(MOTESTOTTE_URL);
            if (moetestoette) {
                settMoetestoette(moetestoette as MoetestoetteRespons);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        hentMoetestoette();
    }, []);

    const contextValue = {
        moetestoette,
    };

    return <MoetestoetteContext.Provider value={contextValue}>{props.children}</MoetestoetteContext.Provider>;
}

function useMoetestoette() {
    const context = useContext(MoetestoetteContext);

    if (context === undefined) {
        throw new Error('useMoetestoette må brukes under en MoetestoetteProvider');
    }
    return context;
}

export { MoetestoetteProvider, useMoetestoette };
