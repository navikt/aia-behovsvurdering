import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';

import { Sprak } from '../../contexts/sprak';
import { motestotteLenke } from '../../urls';

import styles from './moetestoette.module.css';

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
        <Link href={motestotteLenke} variant="neutral" className={styles.link}>
            <Box
                background="surface-default"
                borderRadius="xlarge"
                borderColor={'border-subtle'}
                className={`divide-y divide-gray-300 ${styles.moetestotteBox}`}
            >
                <Heading size="small" level="2" className="flex items-center justify-between pt-4 pb-3 px-5">
                    {tekst('tittel')} <ChevronRightIcon className={styles.chevron} />
                </Heading>
                <section className={'py-4 px-6'}>
                    <BodyShort spacing>{tekst('avsnitt1')}</BodyShort>
                    <BodyShort spacing>{tekst('avsnitt2')}</BodyShort>
                </section>
            </Box>
        </Link>
    );
};

export default Moetestoette;
