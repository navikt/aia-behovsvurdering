import { useEffect, useState } from 'react';

import * as SprakValg from './contexts/sprak';
import { ArbeidssokerperioderProvider } from './contexts/arbeidssokerperioder';
import { ProfileringProvider } from './contexts/profilering';
import { BehovsvurderingProvider } from './contexts/behovsvurdering';

import AiaWrapper from './aia-wrapper';
import './index.css';
import fetcher from './lib/http';
import { FEATURE_URL } from './urls/api';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryFeil } from './components/feil/error-boundary-feil';

export const FEATURE_TOGGLE = 'aia.nedetid';

const useFeatures = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [features, setFeatures] = useState<any>();

    const fetchFeatures = async () => {
        try {
            setFeatures(await fetcher(`${FEATURE_URL}?feature=${FEATURE_TOGGLE}`));
        } catch (err) {
            setFeatures({ [FEATURE_TOGGLE]: true });
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

    if (isLoading) {
        return null;
    }

    if (features[FEATURE_TOGGLE] === true) {
        return <div data-testid={'toggled-off'} style={{ display: 'none' }} />;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFeil}>
            <SprakValg.SprakContext.Provider value={valgtSprak}>
                <ArbeidssokerperioderProvider>
                    <ProfileringProvider>
                        <BehovsvurderingProvider>
                            <AiaWrapper />
                        </BehovsvurderingProvider>
                    </ProfileringProvider>
                </ArbeidssokerperioderProvider>
            </SprakValg.SprakContext.Provider>
        </ErrorBoundary>
    );
}

export default Mikrofrontend;
