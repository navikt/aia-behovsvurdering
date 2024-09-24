import { BodyLong, Box, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';

import { Sprak } from '../../contexts/sprak';
import ReadMoreVeileder from './readmore-veileder';

interface BehovvurderingAvklartProps {
    sprak: Sprak;
    profilering?: any;
    behovsvurdering?: any;
}

const TEKSTER = {
    nb: {
        'heading-enig-standard': 'Du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
        'heading-uenig-standard': 'Du har sagt at du ønsker hjelp',
        'beskrivelse-enig-standard':
            'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egenhånd.',
        'beskrivelse-uenig-standard': 'Vi vil gjøre en vurdering av ditt bistandsbehov.',
        'veiledning-enig-standard': 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
        'veiledning-uenig-standard':
            'Gi beskjed i dialogen dersom du har opplysninger du mener er viktige for vurderingen.',
        'heading-enig-situasjonsbestemt': 'Du har sagt at du ønsker hjelp',
        'heading-uenig-situasjonsbestemt': 'Du har sagt at du vil klare deg selv',
        'beskrivelse-enig-situasjonsbestemt':
            'Du kan ha kontakt med din veileder ved å bruke Dialogen og Aktivitetsplanen.',
        'beskrivelse-uenig-situasjonsbestemt': 'Vi vil gjøre en vurdering av ditt bistandsbehov.',
        'veiledning-enig-situasjonsbestemt': '',
        'veiledning-uenig-situasjonsbestemt':
            'Gi beskjed i dialogen dersom du har opplysninger du mener er viktige for vurderingen.',
        behovForVeiledningLikevel: 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
    },
};

function BehovsvurderingAvklart(props: BehovvurderingAvklartProps) {
    const { sprak, profilering, behovsvurdering } = props;
    const profilertTil = profilering?.profilertTil;
    const behov = behovsvurdering?.oppfolging;
    const antattGodeMuligheter = profilering && profilering.profilertTil === 'ANTATT_GODE_MULIGHETER';
    const tekstnoekkel = antattGodeMuligheter ? 'standard' : 'situasjonsbestemt';
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const enig =
        (profilertTil === 'ANTATT_GODE_MULIGHETER' && behov === 'STANDARD_INNSATS') ||
        (profilertTil === 'ANTATT_BEHOV_FOR_VEILEDNING' && behov === 'SITUASJONSBESTEMT_INNSATS');
    const egenvurdering = enig ? 'enig' : 'uenig';

    return (
        <Box
            background="surface-default"
            borderRadius="xlarge"
            borderColor={'border-subtle'}
            className={'divide-y divide-gray-300'}
        >
            <Heading level="2" size="small" className={'pt-4 pb-3 px-5'}>
                {tekst(`heading-${egenvurdering}-${tekstnoekkel}`)}
            </Heading>
            <div className={'py-4 px-6'}>
                <BodyLong className={'mt-4'}>{tekst(`beskrivelse-${egenvurdering}-${tekstnoekkel}`)}</BodyLong>
                <BodyLong spacing>{tekst(`veiledning-${egenvurdering}-${tekstnoekkel}`)}</BodyLong>
                <ReadMoreVeileder />
            </div>
        </Box>
    );
}

export default BehovsvurderingAvklart;
