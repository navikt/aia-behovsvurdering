import { BodyShort, Box, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../contexts/sprak';
import { leggTilOpplysningerLenke } from '../../urls';

interface ManglerOpplysningerProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Du har registrert deg som arbeidssøker, men ikke lagt til opplysninger enda.',
        linkText: 'Legg til opplysninger',
    },
};

const ManglerOpplysninger = (props: ManglerOpplysningerProps) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <Box>
            <BodyShort>{tekst('header')}</BodyShort>
            <Link href={leggTilOpplysningerLenke}>{tekst('linkText')}</Link>
        </Box>
    );
};

export default ManglerOpplysninger;
