import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useArbeidssokerperioder } from './arbeidssokerperioder';

import {
    ArbeidssokerperioderResponse,
    hentSisteArbeidssokerPeriode,
    ProfileringResponse,
} from '@navikt/arbeidssokerregisteret-utils';
import { PROFILERING_URL } from '../urls/api';
import fetcher from '../lib/http';

interface ProfileringProviderType {
    profilering: ProfileringResponse;
}

export const ProfileringContext = createContext<ProfileringProviderType>({
    profilering: [],
});

function ProfileringProvider(props: { children: ReactNode }) {
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const [profilering, settProfilering] = useState<ProfileringResponse>([]);

    const hentProfilering = async (arbeidssokerperioder: ArbeidssokerperioderResponse) => {
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
        if (periodeId) {
            try {
                const urlForProfilering = `${PROFILERING_URL}/${periodeId}`;
                const oppdatertProfilering = await fetcher(urlForProfilering);
                if (oppdatertProfilering) {
                    settProfilering(oppdatertProfilering as ProfileringResponse);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (arbeidssokerperioder) {
            hentProfilering(arbeidssokerperioder);
        }
    }, [arbeidssokerperioder]);

    const contextValue = {
        profilering,
    };

    return <ProfileringContext.Provider value={contextValue}>{props.children}</ProfileringContext.Provider>;
}

function useProfilering() {
    const context = useContext(ProfileringContext);

    if (context === undefined) {
        throw new Error('useProfilering må brukes under en ProfileringProvider');
    }
    return context;
}

export { ProfileringProvider, useProfilering };
