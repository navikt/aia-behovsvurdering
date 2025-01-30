import { _parseConsentCookie } from './nav-cookie-consent';

describe('nav-cookie-consent', () => {
    it('håndterer tom input', () => {
        expect(_parseConsentCookie('')).toEqual({
            userActionTaken: false,
            consent: {
                analytics: false,
                surveys: false,
            },
        });
    });
    it('parser token når "navno-consent" er midt i strengen', () => {
        const result = _parseConsentCookie(
            'decorator-context=privatperson; navno-consent={%22consent%22:{%22analytics%22:false%2C%22surveys%22:false}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222025-01-24T11:12:59.873Z%22%2C%22updatedAt%22:%222025-01-24T11:12:59.873Z%22%2C%22version%22:1}}; decorator-language=en; test=true',
        );
        expect(result.userActionTaken).toEqual(true);
    });
    it('parser token når "navno-consent" er i enden av cookie', () => {
        const result = _parseConsentCookie(
            'decorator-context=privatperson; navno-consent={%22consent%22:{%22analytics%22:true%2C%22surveys%22:true}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222025-01-24T11:12:59.873Z%22%2C%22updatedAt%22:%222025-01-24T11:12:59.873Z%22%2C%22version%22:1}};',
        );
        expect(result.consent.analytics).toEqual(true);
    });
});
