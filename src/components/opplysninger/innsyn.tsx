import { ReadMore } from '@navikt/ds-react';

import { Sprak } from '../../contexts/sprak';
import OpplysningerOmArbeidssokerKomponent from './opplysninger-om-arbeidssoker-komponent';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { OpplysningerOmArbeidssoker } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { BehovsvurderingResponse } from '../../contexts/behovsvurdering';

const TEKSTER = {
    nb: {
        header: 'Dine opplysninger fra registreringen',
    },
    en: {
        header: 'See your answers from the registration as job seeker',
    },
};

interface InnsynProps {
    sprak: Sprak;
    opplysninger: OpplysningerOmArbeidssoker;
    periode: ArbeidssokerPeriode;
    behovsvurdering: BehovsvurderingResponse;
}

const InnsynLesMer = (props: InnsynProps) => {
    const { sprak, opplysninger, periode, behovsvurdering } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!Boolean(opplysninger?.periodeId)) {
        return null;
    }

    return (
        <ReadMore size="medium" header={tekst('header')}>
            <OpplysningerOmArbeidssokerKomponent
                periode={periode}
                opplysninger={opplysninger}
                sprak={sprak}
                behovsvurdering={behovsvurdering}
            />
        </ReadMore>
    );
};

export { InnsynLesMer };
