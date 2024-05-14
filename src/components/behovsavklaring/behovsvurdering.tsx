import { ArbeidssokerPeriode, Profilering } from '@navikt/arbeidssokerregisteret-utils';

import { Sprak } from '../../contexts/sprak';

import BehovsvurderingAvklart from './behovsvurdering-avklart';
import BehovsvurderingIkkeAvklart from './behovsvurdering-ikke-avklart';

interface BehovvurderingProps {
    sprak: Sprak;
    profilering: Profilering;
    behovsvurdering?: any;
    arbeidssoekerperiode: ArbeidssokerPeriode;
}

function Behovsvurdering(props: BehovvurderingProps) {
    const { sprak, behovsvurdering, profilering, arbeidssoekerperiode } = props;
    const harBehovsvurdering = behovsvurdering;
    const periodeStartetEtterSisteBehovsvurdering =
        !harBehovsvurdering || new Date(arbeidssoekerperiode.startet.tidspunkt) > new Date(behovsvurdering.dato);
    const erAvklart = harBehovsvurdering && !periodeStartetEtterSisteBehovsvurdering;

    return erAvklart ? (
        <BehovsvurderingAvklart sprak={sprak} behovsvurdering={behovsvurdering} profilering={profilering} />
    ) : (
        <BehovsvurderingIkkeAvklart sprak={sprak} profilering={profilering} />
    );
}

export default Behovsvurdering;
