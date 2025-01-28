import * as amplitude from '@amplitude/analytics-browser';
import { getCurrentConsent } from './nav-cookie-consent';

export const isProduction = () => {
    return /https:\/\/www.nav.no\/minside/.test(window.location.href);
};

const isDevelopment = () => /^http:\/\/localhost/.test(window.location.href);
const apiEndpoint = 'https://amplitude.nav.no/collect';

const AMPLITUDE_API_KEY_PROD = '913768927b84cde5eac0d0d18c737561';
const AMPLITUDE_API_KEY_TEST = '9845ded64c69cd068651cd0d968e0796';

const apiKey = isProduction() ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_TEST;

const config = {
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    defaultTracking: false,
    trackingOptions: {
        ipAddress: false,
    },
};

const isConsentingToAnalytics = () => {
    const consent = getCurrentConsent();
    return consent.consent.analytics;
};

export const initAmplitude = async () => {
    if (!isConsentingToAnalytics()) {
        return;
    }
    if (!isDevelopment()) {
        amplitude.init(apiKey, undefined, { ...config, serverUrl: apiEndpoint });
    } else {
        console.info('Initialiserer amplitude');
    }
};

export type VisningsData =
    | { viser: 'BehovsvurderingKort' }
    | { viser: 'ErrorBoundaryFeil'; error: string; stack: string };

type AktivitetData =
    | { aktivitet: 'Trykker på "Behov for veileder"' }
    | { aktivitet: 'Trykker på "Klarer meg uten veileder"' }
    | { aktivitet: 'Trykker på "Readmore: Hva slags hjelp kan du få"' }
    | { aktivitet: 'Trykker på "Readmore: Hvordan vurderer vi ditt behov"' };

type EventData = VisningsData | AktivitetData;

function logAmplitudeEvent(eventName: string, data: EventData) {
    if (!isConsentingToAnalytics()) {
        return;
    }

    const eventData = data || {};
    if (!isDevelopment()) {
        amplitude.logEvent(eventName, { ...eventData });
    } else {
        console.log(`Logger til amplitude: ${eventName}`, data);
    }
}

export function loggVisning(data: VisningsData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('aia-behovsvurdering.visning', eventData);
}

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || ({} as EventData);
    logAmplitudeEvent('aia-behovsvurdering.aktivitet', eventData);
}
