import {
    ArbeidssokerperioderResponse,
    hentSisteArbeidssokerPeriode,
    hentSisteProfilering,
    ProfileringResponse,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';

import Behovsvurdering from './behovsvurdering';
import LoggInViewport from '../logg-in-viewport';

export type Avklaringstype = 'behovsvurdering' | 'moetestoette';

export interface BehovsavklaringProps {
    sprak: Sprak;
    profilering: ProfileringResponse;
    behovsvurdering?: any;
    moetestoette?: any;
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
}

function BehovsavklaringKort(props: BehovsavklaringProps) {
    const { sprak, profilering, behovsvurdering, arbeidssoekerperioder } = props;
    const sisteProfilering = hentSisteProfilering(profilering);
    const sisteArbeidssoekerperiode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const erProfilertTil = sisteProfilering?.profilertTil;
    const harAktivArbeidssoekerPeriode = sisteArbeidssoekerperiode?.avsluttet === null;

    const skalHaBehovsvurdering =
        erProfilertTil && ['ANTATT_GODE_MULIGHETER', 'ANTATT_BEHOV_FOR_VEILEDNING'].includes(erProfilertTil);

    if (!harAktivArbeidssoekerPeriode) return null;

    if (!erProfilertTil || !skalHaBehovsvurdering) {
        return null;
    }

    return (
        <>
            <Behovsvurdering
                sprak={sprak}
                behovsvurdering={behovsvurdering}
                profilering={sisteProfilering}
                arbeidssoekerperiode={sisteArbeidssoekerperiode}
            />
            <LoggInViewport data={{ viser: 'BehovsvurderingKort' }} />
        </>
    );
}

export { BehovsavklaringKort };
