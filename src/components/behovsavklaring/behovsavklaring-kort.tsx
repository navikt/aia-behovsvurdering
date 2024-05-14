import { Box } from '@navikt/ds-react';
import {
    ProfileringResponse,
    hentSisteProfilering,
    hentSisteArbeidssokerPeriode,
    ArbeidssokerperioderResponse,
} from '@navikt/arbeidssokerregisteret-utils';

import { Sprak } from '../../contexts/sprak';

import Moetestoette from './moetestoette';
import Behovsvurdering from './behovsvurdering';
import { VedtaksstoetteRespons } from '../../contexts/vedtaksstoette';

export type Avklaringstype = 'behovsvurdering' | 'moetestoette';

export interface BehovsavklaringProps {
    sprak: Sprak;
    profilering: ProfileringResponse;
    behovsvurdering?: any;
    moetestoette?: any;
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    siste14aVedtak: VedtaksstoetteRespons;
}

const LANSERINGSDATO_MOTESTOTTE = new Date('2020-03-12');

function BehovsavklaringKort(props: BehovsavklaringProps) {
    const { sprak, profilering, behovsvurdering, arbeidssoekerperioder, siste14aVedtak } = props;
    const sisteProfilering = hentSisteProfilering(profilering);
    const sisteArbeidssoekerperiode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const erProfilertTil = sisteProfilering?.profilertTil;
    const harAktivArbeidssoekerPeriode = sisteArbeidssoekerperiode?.avsluttet === null;

    const periodeStartetEtterLanseringAvMoetestoette =
        harAktivArbeidssoekerPeriode &&
        sisteArbeidssoekerperiode.startet &&
        new Date(sisteArbeidssoekerperiode.startet.tidspunkt) > LANSERINGSDATO_MOTESTOTTE;

    const har14aVedtakEtterSistePeriodestart =
        siste14aVedtak &&
        harAktivArbeidssoekerPeriode &&
        sisteArbeidssoekerperiode.startet &&
        new Date(sisteArbeidssoekerperiode.startet.tidspunkt) < new Date(siste14aVedtak.fattetDato);

    const skalHaMoetestoette = erProfilertTil === 'OPPGITT_HINDRINGER' && periodeStartetEtterLanseringAvMoetestoette;

    const skalHaBehovsvurdering =
        erProfilertTil && ['ANTATT_GODE_MULIGHETER', 'ANTATT_BEHOV_FOR_VEILEDNING'].includes(erProfilertTil);

    const avklaringstype = skalHaMoetestoette ? 'moetestoette' : 'behovsvurdering';

    if (!harAktivArbeidssoekerPeriode) return null;

    if (har14aVedtakEtterSistePeriodestart) return null;

    if (!erProfilertTil || (!skalHaBehovsvurdering && !skalHaMoetestoette)) {
        return null;
    }

    return (
        <Box background="surface-default" padding="4" borderRadius="xlarge">
            {avklaringstype === 'behovsvurdering' ? (
                <Behovsvurdering
                    sprak={sprak}
                    behovsvurdering={behovsvurdering}
                    profilering={sisteProfilering}
                    arbeidssoekerperiode={sisteArbeidssoekerperiode}
                />
            ) : (
                <Moetestoette sprak={sprak} />
            )}
        </Box>
    );
}

export { BehovsavklaringKort };
