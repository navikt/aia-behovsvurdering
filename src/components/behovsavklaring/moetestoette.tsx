import { BodyShort, Heading, Box, Link } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
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
        <Link href={motestotteLenke} underline={false} variant="neutral">
            <Box>
                <Heading size="small" level="1" className="flex justify-between mb-4 border-b">
                    <span>{tekst('tittel')}</span> <ChevronRightIcon />
                </Heading>
                <BodyShort spacing>{tekst('avsnitt1')}</BodyShort>
                <BodyShort spacing>{tekst('avsnitt2')}</BodyShort>
            </Box>
        </Link>
    );
};

export default Moetestoette;
