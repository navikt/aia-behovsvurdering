import { ProfileringResponse } from '@navikt/arbeidssokerregisteret-utils';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';
import { BehovsvurderingResponse } from './contexts/behovsvurdering';
import { HGrid } from '@navikt/ds-react';

import { Sprak } from './contexts/sprak';
import RegistrertTittel from './components/registrert-tittel/registrert-tittel';
import { BehovsavklaringKort } from './components/behovsavklaring/behovsavklaring-kort';
import MinSituasjonKort from './components/min-situasjon/min-situasjon-kort';
import { OnOppdaterOpplysninger } from './types/oppdater-opplysninger';
import { MoetestoetteRespons } from './contexts/moetestoette';
import { VedtaksstoetteRespons } from './contexts/vedtaksstoette';

export interface AiaProps {
    arbeidssokerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssokerResponse;
    profilering: ProfileringResponse;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    onOppdaterOpplysninger: OnOppdaterOpplysninger;
    moetestoette: MoetestoetteRespons;
    siste14aVedtak: VedtaksstoetteRespons;
}

function AiA(props: AiaProps) {
    const {
        arbeidssokerperioder,
        opplysningerOmArbeidssoker,
        sprak,
        profilering,
        moetestoette,
        behovsvurdering,
        siste14aVedtak,
    } = props;

    const erIkkeAktivArbeidssoker = arbeidssokerperioder.length === 0;

    if (erIkkeAktivArbeidssoker) {
        return null;
    }

    return (
        <>
            <RegistrertTittel
                sprak={sprak}
                arbeidssokerperioder={arbeidssokerperioder}
                opplysningerOmArbeidssoker={opplysningerOmArbeidssoker}
            />
            <HGrid columns={{ xs: 1, sm: 1, md: 2 }} gap={'6'} className={'mb-4'}>
                <MinSituasjonKort {...props} />
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
