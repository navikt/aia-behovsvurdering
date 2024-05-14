import { hentSisteArbeidssokerPeriode, lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../contexts/sprak';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';
import { Alert, Box } from '@navikt/ds-react';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';

export const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertPermittert: 'Du er registrert som permittert arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertPermittert: 'You are registered as a temporarily layed off job seeker',
    },
};

function hentTekstNokkel(erPermittert: boolean) {
    if (erPermittert) {
        return 'registrertPermittert';
    }

    return 'registrert';
}

interface Props {
    sprak: Sprak;
    arbeidssokerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssokerResponse;
}

const RegistrertTittel = (props: Props) => {
    const { arbeidssokerperioder, opplysningerOmArbeidssoker, sprak } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const periode = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.length > 0 && !Boolean(periode.avsluttet);
    const erPermittert = harPermittertSituasjon(opplysningerOmArbeidssoker);

    if (!harAktivArbeidssokerperiode) return null;

    return (
        <Box className={'mb-4'}>
            <Alert variant="info">{tekst(hentTekstNokkel(erPermittert))}</Alert>
        </Box>
    );
};

export default RegistrertTittel;
