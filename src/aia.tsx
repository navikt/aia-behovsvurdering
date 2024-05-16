import { ProfileringResponse } from '@navikt/arbeidssokerregisteret-utils';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { BehovsvurderingResponse } from './contexts/behovsvurdering';
import { HGrid } from '@navikt/ds-react';

import { Sprak } from './contexts/sprak';
import { BehovsavklaringKort } from './components/behovsavklaring/behovsavklaring-kort';
import { MoetestoetteRespons } from './contexts/moetestoette';
import { VedtaksstoetteRespons } from './contexts/vedtaksstoette';

export interface AiaProps {
    arbeidssokerperioder: ArbeidssokerperioderResponse;
    profilering: ProfileringResponse;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    moetestoette: MoetestoetteRespons;
    siste14aVedtak: VedtaksstoetteRespons;
}

function AiA(props: AiaProps) {
    const { arbeidssokerperioder, sprak, profilering, moetestoette, behovsvurdering, siste14aVedtak } = props;

    const erIkkeAktivArbeidssoker = arbeidssokerperioder.length === 0;

    if (erIkkeAktivArbeidssoker) {
        return null;
    }

    return (
        <>
            <HGrid columns={{ xs: 1, sm: 1, md: 2 }} gap={'6'} className={'mb-4'}>
                <BehovsavklaringKort
                    sprak={sprak}
                    profilering={profilering}
                    behovsvurdering={behovsvurdering}
                    arbeidssoekerperioder={arbeidssokerperioder}
                    moetestoette={moetestoette}
                    siste14aVedtak={siste14aVedtak}
                />
            </HGrid>
        </>
    );
}

export default AiA;
