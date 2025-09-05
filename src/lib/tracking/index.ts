import { getCurrentConsent } from '../nav-cookie-consent';
import { logUmamiEvent } from './umami';

export type VisningsData =
    | { viser: 'BehovsvurderingKort' }
    | { viser: 'ErrorBoundaryFeil'; error: string; stack: string };

type AktivitetData =
    | { aktivitet: 'Trykker på "Behov for veileder"' }
    | { aktivitet: 'Trykker på "Klarer meg uten veileder"' }
    | { aktivitet: 'Trykker på "Readmore: Hva slags hjelp kan du få"' }
    | { aktivitet: 'Trykker på "Readmore: Hvordan vurderer vi ditt behov"' };

export type EventData = VisningsData | AktivitetData;

export const isProduction = () => {
    return /https:\/\/www.nav.no\/minside/.test(window.location.href);
};

export const isDevelopment = () => /^http:\/\/localhost/.test(window.location.href);

export const isConsentingToAnalytics = () => {
    const consent = getCurrentConsent();
    return consent.consent.analytics;
};

export function loggVisning(data: VisningsData) {
    if (!isConsentingToAnalytics()) {
        return;
    }
    const eventData = data || ({} as EventData);
    logUmamiEvent('aia-behovsvurdering.visning', eventData);
}

export async function loggAktivitet(data: AktivitetData) {
    if (!isConsentingToAnalytics()) {
        return;
    }
    const eventData = data || ({} as EventData);
    await logUmamiEvent('aia-behovsvurdering.aktivitet', eventData);
}
