import { Box, BodyLong, Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';

import { useBehovsvurdering } from '../../contexts/behovsvurdering';

import { Sprak } from '../../contexts/sprak';
import ReadMoreVeileder from './readmore-veileder';
import ReadMoreVurdering from './readmore-vurdering';
import { ForeslattInnsatsgruppe } from '../../contexts/behovsvurdering';

interface BehovvurderingIkkeAvklartProps {
    sprak: Sprak;
    profilering?: any;
}

const TEKSTER = {
    nb: {
        'heading-standard': 'Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
        'beskrivelse-standard':
            'En veileders oppgave er å hjelpe deg med å søke stillinger og finne aktuelle tiltak på veien til arbeid.',
        'svarEnigKnappetekst-standard': 'Jeg klarer meg uten veileder',
        'svarUenigKnappetekst-standard': 'Jeg trenger en veileder for å komme i arbeid',
        'dialogtekstNavSinVurdering-standard':
            'NAV sin vurdering: Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV.',
        'dialogtekstSvarEnig-standard': 'Jeg klarer meg uten veileder',
        'dialogtekstSvarUenig-standard': 'Jeg trenger en veileder for å komme i arbeid',
        dialogtekstMinVurdering: 'Min vurdering: ',
        veilederKanIkke: 'En veileder kan ikke svare på spørsmål om dagpenger eller meldekort.',
        'heading-situasjonsbestemt': 'Ønsker du hjelp fra en veileder?',
        'beskrivelse-situasjonsbestemt': 'Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        'svarEnigKnappetekst-situasjonsbestemt': 'Ja, jeg ønsker hjelp',
        'svarUenigKnappetekst-situasjonsbestemt': 'Nei, jeg vil gjerne klare meg selv',
        'dialogtekstNavSinVurdering-situasjonsbestemt':
            'NAV sin vurdering: Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        'dialogtekstSvarEnig-situasjonsbestemt': 'Ja, jeg ønsker hjelp',
        'dialogtekstSvarUenig-situasjonsbestemt': 'Nei, jeg vil gjerne klare meg selv',
    },
};

function BehovsvurderingIkkeAvklart(props: BehovvurderingIkkeAvklartProps) {
    const [pendingRequest, settPendingRequest] = useState<ForeslattInnsatsgruppe | null>(null);
    const { lagreBehovsvurdering } = useBehovsvurdering();
    const { sprak, profilering } = props;
    const profilertTil = profilering?.profilertTil;
    const profileringId = profilering?.profileringId;
    const antattGodeMuligheter = profilering && profilering.profilertTil === 'ANTATT_GODE_MULIGHETER';
    const tekstnoekkel = antattGodeMuligheter ? 'standard' : 'situasjonsbestemt';
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const enigRespons = antattGodeMuligheter
        ? ForeslattInnsatsgruppe.STANDARD_INNSATS
        : ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
    const uenigRespons = antattGodeMuligheter
        ? ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS
        : ForeslattInnsatsgruppe.STANDARD_INNSATS;

    async function onClickBehovForVeiledning(behov: ForeslattInnsatsgruppe) {
        const erStandard = behov === ForeslattInnsatsgruppe.STANDARD_INNSATS;

        // Dialogmeldingen skal gjenspeile svarene fra knappevalgene, endres det ene bør det andre også endres
        const dialogmelding =
            tekst(`dialogtekstNavSinVurdering-${tekstnoekkel}`) +
            '\n\n' +
            tekst('dialogtekstMinVurdering') +
            (erStandard
                ? tekst(`dialogtekstSvarEnig-${tekstnoekkel}`)
                : tekst(`dialogtekstSvarUenig-${tekstnoekkel}`)) +
            '.\n\n' +
            tekst('dialogtekstAutomatiskGenerert');

        settPendingRequest(behov);
        try {
            await lagreBehovsvurdering({
                oppfolging: behov,
                overskrift: tekst('behovOverskrift'),
                tekst: dialogmelding,
                venterPaaSvarFraNav: !erStandard,
                profileringId,
            });
        } finally {
            settPendingRequest(null);
        }
    }

    if (!profilertTil) return null;

    return (
        <Box>
            <Heading level="3" size="small">
                {tekst(`heading-${tekstnoekkel}`)}
            </Heading>
            <BodyLong spacing>{tekst(`beskrivelse-${tekstnoekkel}`)}</BodyLong>
            <BodyLong spacing>{tekst('veilederKanIkke')}</BodyLong>
            <Button
                onClick={() => onClickBehovForVeiledning(enigRespons)}
                disabled={pendingRequest !== null}
                loading={pendingRequest === enigRespons}
            >
                {tekst(`svarEnigKnappetekst-${tekstnoekkel}`)}
            </Button>
            <div className="mb-4">
                <Button
                    onClick={() => onClickBehovForVeiledning(uenigRespons)}
                    disabled={pendingRequest !== null}
                    loading={pendingRequest === uenigRespons}
                    variant="secondary"
                    className="mt-4"
                >
                    {tekst(`svarUenigKnappetekst-${tekstnoekkel}`)}
                </Button>
            </div>

            <ReadMoreVeileder />
            <ReadMoreVurdering />
        </Box>
    );
}

export default BehovsvurderingIkkeAvklart;
