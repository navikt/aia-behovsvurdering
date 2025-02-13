import { ProfileringResponse, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { BehovsvurderingResponse } from './contexts/behovsvurdering';

import { BehovsavklaringKort } from './components/behovsavklaring/behovsavklaring-kort';
import { MoetestoetteRespons } from './contexts/moetestoette';

export interface BehovsvurderingProps {
    arbeidssokerperioder: ArbeidssokerperioderResponse;
    profilering: ProfileringResponse;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    moetestoette: MoetestoetteRespons;
}

function Behovsvurdering(props: BehovsvurderingProps) {
    const { arbeidssokerperioder, sprak, profilering, moetestoette, behovsvurdering } = props;

    const erIkkeAktivArbeidssoker = arbeidssokerperioder.length === 0;

    if (erIkkeAktivArbeidssoker) {
        return null;
    }

    return (
        <BehovsavklaringKort
            sprak={sprak}
            profilering={profilering}
            behovsvurdering={behovsvurdering}
            arbeidssoekerperioder={arbeidssokerperioder}
            moetestoette={moetestoette}
        />
    );
}

export default Behovsvurdering;
