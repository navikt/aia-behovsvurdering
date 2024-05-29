import { useEffect, useState } from 'react';

import * as SprakValg from './contexts/sprak';
import { ArbeidssokerperioderProvider } from './contexts/arbeidssokerperioder';
import { ProfileringProvider } from './contexts/profilering';
import { BehovsvurderingProvider } from './contexts/behovsvurdering';
import { MoetestoetteProvider } from './contexts/moetestoette';
import { VedtaksstoetteProvider } from './contexts/vedtaksstoette';

import AiaWrapper from './aia-wrapper';
import './index.css';
import { initAmplitude } from './lib/amplitude';

function Mikrofrontend() {
    const [valgtSprak, setValgtSprak] = useState<SprakValg.State>(SprakValg.initialState);

    useEffect(() => {
        setValgtSprak(SprakValg.hentSprakValgFraUrl);
    }, [window.location.href]);

    useEffect(() => {
        initAmplitude();
    }, []);

    return (
        <SprakValg.SprakContext.Provider value={valgtSprak}>
            <ArbeidssokerperioderProvider>
                <ProfileringProvider>
                    <BehovsvurderingProvider>
                        <MoetestoetteProvider>
                            <VedtaksstoetteProvider>
                                <AiaWrapper />
                            </VedtaksstoetteProvider>
                        </MoetestoetteProvider>
                    </BehovsvurderingProvider>
                </ProfileringProvider>
            </ArbeidssokerperioderProvider>
        </SprakValg.SprakContext.Provider>
    );
}

export default Mikrofrontend;
