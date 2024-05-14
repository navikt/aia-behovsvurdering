import { mapJobbsituasjonTilTilleggsData, mapTilleggsDataTilJobbdetaljer } from './map-tilleggsdata';
import { DinSituasjon, PermittertSvar } from '@navikt/arbeidssokerregisteret-utils';

describe('mapTilleggsDataTilJobbdetaljer', () => {
    test('mapper oppsigelsesdato', () => {
        expect(mapTilleggsDataTilJobbdetaljer('oppsigelseDato', DinSituasjon.ER_PERMITTERT)).toEqual(
            'gjelder_fra_dato_iso8601',
        );
    });
    test('mapper sisteArbeidsdagDato', () => {
        expect(mapTilleggsDataTilJobbdetaljer('sisteArbeidsdagDato', DinSituasjon.ER_PERMITTERT)).toEqual(
            'siste_dag_med_loenn_iso8601',
        );
    });
    test('mapper sisteArbeidsdagDato når SAGT_OPP', () => {
        expect(mapTilleggsDataTilJobbdetaljer('sisteArbeidsdagDato', PermittertSvar.SAGT_OPP)).toEqual(
            'siste_arbeidsdag_iso8601',
        );
    });
    test('mapper forsteArbeidsdagDato', () => {
        expect(mapTilleggsDataTilJobbdetaljer('forsteArbeidsdagDato', DinSituasjon.ER_PERMITTERT)).toEqual(
            'gjelder_fra_dato_iso8601',
        );
    });
    test('mapper stillingsProsent', () => {
        expect(mapTilleggsDataTilJobbdetaljer('stillingsProsent', DinSituasjon.ER_PERMITTERT)).toEqual('prosent');
    });
    test('mapper permitteringsProsent', () => {
        expect(mapTilleggsDataTilJobbdetaljer('permitteringsProsent', DinSituasjon.ER_PERMITTERT)).toEqual('prosent');
    });
    test('mapper gjelderFraDato', () => {
        expect(mapTilleggsDataTilJobbdetaljer('gjelderFraDato', DinSituasjon.ER_PERMITTERT)).toEqual(
            'gjelder_fra_dato_iso8601',
        );
    });
});

describe('mapJobbsituasjonTilTilleggsData', () => {
    test('mapper HAR_BLITT_SAGT_OPP', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'HAR_BLITT_SAGT_OPP',
                detaljer: {
                    gjelder_fra_dato_iso8601: '2024-02-25',
                    siste_dag_med_loenn_iso8601: '2024-03-29',
                },
            }),
        ).toEqual({
            oppsigelseDato: '2024-02-25',
            sisteArbeidsdagDato: '2024-03-29',
        });
    });
    test('mapper ER_PERMITTERT til tilbake til jobb', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'ER_PERMITTERT',
                detaljer: {
                    gjelder_til_dato_iso8601: '2024-02-25',
                    prosent: '75',
                },
            }),
        ).toEqual({
            forsteArbeidsdagDato: '2024-02-25',
            stillingsProsent: '75',
        });
    });
    test('mapper ER_PERMITTERT til endre permitterings prosent', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'ER_PERMITTERT',
                detaljer: {
                    gjelder_fra_dato_iso8601: '2024-02-25',
                    prosent: '75',
                },
            }),
        ).toEqual({
            gjelderFraDato: '2024-02-25',
            permitteringsProsent: '75',
        });
    });
    test('mapper MIDLERTIDIG_JOBB', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'MIDLERTIDIG_JOBB',
                detaljer: {
                    gjelder_fra_dato_iso8601: '2024-02-25',
                    prosent: '75',
                },
            }),
        ).toEqual({
            forsteArbeidsdagDato: '2024-02-25',
            stillingsProsent: '75',
        });
    });
    test('mapper KONKURS', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'KONKURS',
                detaljer: {
                    siste_dag_med_loenn_iso8601: '2024-03-29',
                },
            }),
        ).toEqual({
            sisteArbeidsdagDato: '2024-03-29',
        });
    });
    test('mapper NY_JOBB', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'NY_JOBB',
                detaljer: {
                    gjelder_fra_dato_iso8601: '2024-04-01',
                    prosent: '75',
                },
            }),
        ).toEqual({
            forsteArbeidsdagDato: '2024-04-01',
            stillingsProsent: '75',
        });
    });
    test('mapper HAR_SAGT_OPP', () => {
        expect(
            mapJobbsituasjonTilTilleggsData({
                beskrivelse: 'HAR_SAGT_OPP',
                detaljer: {
                    gjelder_fra_dato_iso8601: '2024-04-01',
                    siste_arbeidsdag_iso8601: '2024-05-01',
                    gjelder_til_dato_iso8601: '2024-06-01',
                },
            }),
        ).toEqual({
            oppsigelseDato: '2024-04-01',
            sisteArbeidsdagDato: '2024-05-01',
            forsteArbeidsdagDato: '2024-06-01',
        });
    });
});
