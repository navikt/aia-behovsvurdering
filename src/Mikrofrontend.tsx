import { useEffect, useState } from 'react';

import * as SprakValg from './contexts/sprak';
import { ArbeidssokerperioderProvider } from './contexts/arbeidssokerperioder';
import { ProfileringProvider } from './contexts/profilering';
import { BehovsvurderingProvider } from './contexts/behovsvurdering';
import { MoetestoetteProvider } from './contexts/moetestoette';

import AiaWrapper from './aia-wrapper';
import './index.css';
import { initAmplitude } from './lib/amplitude';
import { FEATURE_URL } from './urls/api';
import fetcher from './lib/http';
export const FEATURE_TOGGLE = 'aia.bruk-opplysninger-om-arbeidssoker-api';

const useFeatures = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [features, setFeatures] = useState<any>();

    const fetchFeatures = async () => {
        try {
            setFeatures(await fetcher(`${FEATURE_URL}?feature=${FEATURE_TOGGLE}`));
        } catch (err) {
            setFeatures({ [FEATURE_TOGGLE]: false });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    return {
        isLoading,
        features,
    };
};

function Mikrofrontend() {
    const [valgtSprak, setValgtSprak] = useState<SprakValg.State>(SprakValg.initialState);
    const { isLoading, features } = useFeatures();
    useEffect(() => {
        setValgtSprak(SprakValg.hentSprakValgFraUrl);
    }, [window.location.href]);

    useEffect(() => {
        initAmplitude();
    }, []);

    if (isLoading || features[FEATURE_TOGGLE] === false) {
        return null;
    }

    return (
        <SprakValg.SprakContext.Provider value={valgtSprak}>
            <ArbeidssokerperioderProvider>
                <ProfileringProvider>
                    <BehovsvurderingProvider>
                        <MoetestoetteProvider>
                            <AiaWrapper />
                        </MoetestoetteProvider>
                    </BehovsvurderingProvider>
                </ProfileringProvider>
            </ArbeidssokerperioderProvider>
        </SprakValg.SprakContext.Provider>
    );
}

export default Mikrofrontend;
