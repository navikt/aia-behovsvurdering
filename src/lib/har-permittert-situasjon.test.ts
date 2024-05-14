import { harPermittertSituasjon } from './har-permittert-situasjon';
import { DinSituasjon } from '@navikt/arbeidssokerregisteret-utils';

describe('har-permittert-situasjon', () => {
    test('returnerer false for tom input', () => {
        expect(harPermittertSituasjon([])).toBe(false);
    });

    test('returnerer true for registrert permittert', () => {
        expect(
            harPermittertSituasjon([
                {
                    jobbsituasjon: [
                        {
                            beskrivelse: 'ER_PERMITTERT',
                        },
                    ],
                } as any,
            ]),
        ).toBe(true);
    });

    test('returnerer true for permittert besvarelse', () => {
        [
            'HAR_SAGT_OPP',
            'HAR_BLITT_SAGT_OPP',
            'ER_PERMITTERT',
            'NY_JOBB',
            'MIDLERTIDIG_JOBB',
            'KONKURS',
            'SAGT_OPP',
        ].forEach((svar) => {
            expect(
                harPermittertSituasjon([
                    {
                        sendtInnAv: {
                            tidspunkt: '2024-03-14T13:15:48.969Z',
                        },
                        jobbsituasjon: [
                            {
                                beskrivelse: svar,
                            },
                        ],
                    } as any,
                    {
                        sendtInnAv: {
                            tidspunkt: '2024-03-14T13:15:48.969Z',
                        },
                        jobbsituasjon: [{ beskrivelse: 'ER_PERMITTERT' }],
                    },
                ]),
            ).toBe(true);
        });
    });

    test('returnerer false for ikke-permittert besvarelse', () => {
        expect(
            harPermittertSituasjon([
                {
                    jobbsituasjon: [
                        {
                            beskrivelse: DinSituasjon.HAR_SAGT_OPP,
                        },
                    ],
                } as any,
            ]),
        ).toBe(false);
    });
});
