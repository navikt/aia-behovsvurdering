import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';
import { hentSisteOpplysningerOmArbeidssoker } from '@navikt/arbeidssokerregisteret-utils';

const permitterteBeskrivelser = [
    'HAR_SAGT_OPP',
    'HAR_BLITT_SAGT_OPP',
    'ER_PERMITTERT',
    'NY_JOBB',
    'MIDLERTIDIG_JOBB',
    'KONKURS',
    'SAGT_OPP',
    'ANNET',
];

export function harPermittertSituasjon(opplysninger: OpplysningerOmArbeidssokerResponse): boolean {
    if (opplysninger.length === 0) {
        return false;
    }

    if (opplysninger.length === 1) {
        return opplysninger[0].jobbsituasjon[0].beskrivelse === 'ER_PERMITTERT';
    }

    const o = hentSisteOpplysningerOmArbeidssoker(opplysninger);
    return o.jobbsituasjon?.some((situasjon) => permitterteBeskrivelser.includes(situasjon.beskrivelse));
}
