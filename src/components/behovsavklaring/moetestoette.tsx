import { BodyShort, Button, Heading, Box } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';

import { Sprak } from '../../contexts/sprak';
import { motestotteLenke } from '../../urls';

interface MoetestoetteProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        tittel: 'Du kan få veiledning',
        avsnitt1: 'Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb.',
        avsnitt2: 'Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.',
    },
};

const Moetestoette = (props: MoetestoetteProps) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box>
            <Heading size="small" level="1">
                {tekst('tittel')}
            </Heading>
            <BodyShort spacing>{tekst('avsnitt1')}</BodyShort>
            <BodyShort spacing>{tekst('avsnitt2')}</BodyShort>
            <Button variant="primary" onClick={() => window.location.assign(motestotteLenke)}>
                Start
            </Button>
        </Box>
    );
};

export default Moetestoette;
