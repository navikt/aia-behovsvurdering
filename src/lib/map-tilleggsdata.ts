import { TilleggsdataType } from '../types/tilleggsdata';
import { DinSituasjon, Jobbsituasjon, PermittertSvar } from '@navikt/arbeidssokerregisteret-utils';

const mapTilleggsDataTilJobbdetaljer = (key: keyof TilleggsdataType, situasjon: PermittertSvar | DinSituasjon) => {
    switch (key) {
        case 'oppsigelseDato':
            return 'gjelder_fra_dato_iso8601';
        case 'sisteArbeidsdagDato':
            return situasjon === PermittertSvar.SAGT_OPP ? 'siste_arbeidsdag_iso8601' : 'siste_dag_med_loenn_iso8601';
        case 'forsteArbeidsdagDato':
            return [PermittertSvar.TILBAKE_TIL_JOBB, PermittertSvar.SAGT_OPP].includes(situasjon as any)
                ? 'gjelder_til_dato_iso8601'
                : 'gjelder_fra_dato_iso8601';
        case 'stillingsProsent':
            return 'prosent';
        case 'gjelderFraDato':
            return 'gjelder_fra_dato_iso8601';
        case 'permitteringsProsent':
            return 'prosent';
        default:
            return undefined;
    }
};
const mapJobbsituasjonTilTilleggsData = (situasjon: Jobbsituasjon) => {
    const { beskrivelse, detaljer } = situasjon;

    switch (beskrivelse) {
        case 'HAR_BLITT_SAGT_OPP': {
            return {
                oppsigelseDato: detaljer.gjelder_fra_dato_iso8601,
                sisteArbeidsdagDato: detaljer.siste_dag_med_loenn_iso8601,
            };
        }
        case 'ER_PERMITTERT': {
            const erTilbakeTilJobb = Boolean(detaljer.gjelder_til_dato_iso8601);
            return erTilbakeTilJobb
                ? {
                      forsteArbeidsdagDato: detaljer.gjelder_til_dato_iso8601,
                      stillingsProsent: detaljer.prosent,
                  }
                : {
                      gjelderFraDato: detaljer.gjelder_fra_dato_iso8601,
                      permitteringsProsent: detaljer.prosent,
                  };
        }
        case 'MIDLERTIDIG_JOBB': {
            return {
                forsteArbeidsdagDato: detaljer.gjelder_fra_dato_iso8601,
                stillingsProsent: detaljer.prosent,
            };
        }
        case 'KONKURS': {
            return {
                sisteArbeidsdagDato: detaljer.siste_dag_med_loenn_iso8601,
            };
        }
        case 'NY_JOBB': {
            return {
                forsteArbeidsdagDato: detaljer.gjelder_fra_dato_iso8601,
                stillingsProsent: detaljer.prosent,
            };
        }
        case 'HAR_SAGT_OPP': {
            return {
                oppsigelseDato: detaljer.gjelder_fra_dato_iso8601,
                sisteArbeidsdagDato: detaljer.siste_arbeidsdag_iso8601,
                forsteArbeidsdagDato: detaljer.gjelder_til_dato_iso8601,
            };
        }
        default:
            return undefined;
    }
};

export { mapTilleggsDataTilJobbdetaljer, mapJobbsituasjonTilTilleggsData };
