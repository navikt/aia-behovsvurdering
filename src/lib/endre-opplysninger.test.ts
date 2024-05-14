import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { OPPDATER_OPPLYSNINGER_URL, OPPRETT_DIALOG_URL, OPPRETT_OPPGAVE_URL } from '../urls/api';
import endreOpplysninger, { mapOppdateringTilOpplysningerPayload } from './endre-opplysninger';
import { OpplysningerOmArbeidssoker, PermittertSvar } from '@navikt/arbeidssokerregisteret-utils';
import opplysningerOmArbeidssokerMock from '../mocks/opplysninger-om-arbeidssoker-mock';

describe('Lagre opplysninger', () => {
    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('oppretter ikke oppgave når togglet av', async () => {
        const spy = vi.fn();
        server.use(
            http.post(OPPRETT_OPPGAVE_URL, async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json('ok');
            }),
            http.post(OPPRETT_DIALOG_URL, async () => HttpResponse.json('ok')),
            http.post(OPPDATER_OPPLYSNINGER_URL, async () => HttpResponse.json('ok')),
        );
        await endreOpplysninger({ oppdatering: { dinSituasjon: {} } } as any, false, {} as OpplysningerOmArbeidssoker);
        expect(spy).toHaveBeenCalledTimes(0);
    });

    test('oppretter oppgave når togglet på', async () => {
        const spy = vi.fn();
        server.use(
            http.post(OPPRETT_OPPGAVE_URL, async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json('ok');
            }),
            http.post(OPPRETT_DIALOG_URL, async () => HttpResponse.json('ok')),
            http.post(OPPDATER_OPPLYSNINGER_URL, async () => HttpResponse.json('ok')),
        );

        const endringer = {
            oppgaveBeskrivelse: 'beskrivelse',
            valgtSituasjon: PermittertSvar.ANNET,
            oppdatering: { dinSituasjon: {} },
        };

        await endreOpplysninger(endringer as any, true, {} as OpplysningerOmArbeidssoker);

        expect(spy).toHaveBeenCalledWith({
            beskrivelse: 'beskrivelse',
            dinSituasjon: PermittertSvar.ANNET,
        });
    });

    test.skip('oppretter dialog', async () => {
        const spy = vi.fn();
        server.use(
            http.post(OPPRETT_DIALOG_URL, async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json('ok');
            }),
            http.post(OPPDATER_OPPLYSNINGER_URL, async () => HttpResponse.json('ok')),
        );

        const endringer = {
            tekst: 'teskst',
            overskrift: 'overskrift',
            venterPaaSvarFraNav: true,
        };

        await endreOpplysninger(endringer as any, false, {} as OpplysningerOmArbeidssoker);

        expect(spy).toHaveBeenCalledWith({
            tekst: 'teskst',
            overskrift: 'overskrift',
            venterPaaSvarFraNav: true,
        });
    });

    test('oppdaterer opplysninger', async () => {
        const spy = vi.fn();
        server.use(
            http.post(OPPDATER_OPPLYSNINGER_URL, async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json('ok');
            }),
        );

        const endringer = {
            oppdatering: {
                dinSituasjon: {
                    verdi: PermittertSvar.ANNET,
                },
            },
        };
        const result = await endreOpplysninger(endringer as any, true, {} as OpplysningerOmArbeidssoker);

        expect(result).toEqual('ok');
        expect(spy).toHaveBeenCalledWith({
            opplysningerOmArbeidssoeker: {
                jobbsituasjon: {
                    beskrivelser: [
                        {
                            beskrivelse: PermittertSvar.ANNET,
                            detaljer: {},
                        },
                    ],
                },
            },
        });
    });
});

describe('mapOppdateringTilOpplysningerPayload', () => {
    test('fletter sammen gamle og nye opplysninger', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.OPPSIGELSE,
                        tilleggsData: {
                            oppsigelseDato: '2024-02-25',
                            sisteArbeidsdagDato: '2024-03-29',
                            harNyJobb: 'ja',
                        },
                    },
                },
                opplysningerOmArbeidssokerMock[0],
            ),
        ).toEqual({
            opplysningerOmArbeidssoeker: {
                utdanning: {
                    nus: '4',
                    bestaatt: 'JA',
                    godkjent: 'JA',
                },
                helse: {
                    helsetilstandHindrerArbeid: 'NEI',
                },
                annet: {
                    andreForholdHindrerArbeid: 'NEI',
                },
                jobbsituasjon: {
                    beskrivelser: [
                        {
                            beskrivelse: 'HAR_BLITT_SAGT_OPP',
                            detaljer: {
                                gjelder_fra_dato_iso8601: '2024-02-25',
                                siste_dag_med_loenn_iso8601: '2024-03-29',
                                stilling_styrk08: '7213',
                                stilling: 'Bilskadereparatør',
                            },
                        },
                    ],
                },
            },
        });
    });
    test('mapper OPPSIGELSE', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.OPPSIGELSE,
                        tilleggsData: {
                            oppsigelseDato: '2024-02-25',
                            sisteArbeidsdagDato: '2024-03-29',
                            harNyJobb: 'ja',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'HAR_BLITT_SAGT_OPP',
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-02-25',
                            siste_dag_med_loenn_iso8601: '2024-03-29',
                        },
                    },
                ],
            },
        });
    });

    test('mapper TILBAKE_TIL_JOBB', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.TILBAKE_TIL_JOBB,
                        tilleggsData: {
                            forsteArbeidsdagDato: '2024-04-01',
                            stillingsProsent: '75',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            gjelder_til_dato_iso8601: '2024-04-01',
                            prosent: '75',
                        },
                    },
                ],
            },
        });
    });

    test('mapper MIDLERTIDIG_JOBB', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.MIDLERTIDIG_JOBB,
                        tilleggsData: {
                            forsteArbeidsdagDato: '2024-04-01',
                            stillingsProsent: '75',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: PermittertSvar.MIDLERTIDIG_JOBB,
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-04-01',
                            prosent: '75',
                        },
                    },
                ],
            },
        });
    });

    test('mapper KONKURS', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.KONKURS,
                        tilleggsData: {
                            sisteArbeidsdagDato: '2024-03-29',
                            harNyJobb: 'nei',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'KONKURS',
                        detaljer: {
                            siste_dag_med_loenn_iso8601: '2024-03-29',
                        },
                    },
                ],
            },
        });
    });

    test('mapper NY_JOBB', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.NY_JOBB,
                        tilleggsData: {
                            forsteArbeidsdagDato: '2024-04-01',
                            stillingsProsent: '75',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'NY_JOBB',
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-04-01',
                            prosent: '75',
                        },
                    },
                ],
            },
        });
    });

    test('mapper ENDRET_PERMITTERINGSPROSENT', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.ENDRET_PERMITTERINGSPROSENT,
                        tilleggsData: {
                            gjelderFraDato: '2024-04-01',
                            permitteringsProsent: '75',
                            permitteringForlenget: 'Ja',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-04-01',
                            prosent: '75',
                        },
                    },
                ],
            },
        });
    });

    test('mapper SAGT_OPP', () => {
        expect(
            mapOppdateringTilOpplysningerPayload(
                {
                    dinSituasjon: {
                        verdi: PermittertSvar.SAGT_OPP,
                        tilleggsData: {
                            oppsigelseDato: '2024-04-01',
                            sisteArbeidsdagDato: '2024-05-01',
                            forsteArbeidsdagDato: '2024-06-01',
                            harNyJobb: 'Nei',
                        },
                    },
                },
                {} as OpplysningerOmArbeidssoker,
            ).opplysningerOmArbeidssoeker,
        ).toEqual({
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: 'HAR_SAGT_OPP',
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-04-01',
                            siste_arbeidsdag_iso8601: '2024-05-01',
                            gjelder_til_dato_iso8601: '2024-06-01',
                        },
                    },
                ],
            },
        });
    });
});
