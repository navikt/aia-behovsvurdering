import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';

import { EventData, isDevelopment } from './index';

export async function logUmamiEvent(eventName: string, data: EventData) {
    try {
        const tracker = getAnalyticsInstance('aia-min-side');
        if (!isDevelopment()) {
            await tracker(eventName, data);
        } else {
            console.log(`Logger til umami: ${eventName}`, data);
        }
    } catch (error) {
        console.warn('Feil med umami-logging', error);
    }
}
