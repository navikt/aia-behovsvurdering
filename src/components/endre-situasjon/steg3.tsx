import { Alert, BodyShort, Button } from '@navikt/ds-react';

import { Sprak } from '../../contexts/sprak';
import { TilleggsdataType } from '../../types/tilleggsdata';
import {
    DinSituasjon,
    lagHentTekstForSprak,
    PermittertSvar,
    SPORSMAL_TEKSTER,
} from '@navikt/arbeidssokerregisteret-utils';
import TilleggsData from './tilleggsdata';
import Veiledning from './veiledning';

export interface Steg3Props {
    valgtSituasjon: PermittertSvar | DinSituasjon;
    tilleggsData?: TilleggsdataType;
    onClose(): void;
    sprak: Sprak;
}

const Steg3 = (props: Steg3Props) => {
    const { valgtSituasjon, onClose, tilleggsData, sprak } = props;
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);
    const headingTekst = tekst(valgtSituasjon);

    return (
        <>
            <Alert variant="info" className={'mb-4'}>
                NAV har mottatt følgende oppdateringer:
                <div className={'my-4'}>
                    <BodyShort>{headingTekst}</BodyShort>
                    <TilleggsData verdi={valgtSituasjon as string} tilleggsData={tilleggsData} />
                </div>
            </Alert>
            <Veiledning valgtSituasjon={valgtSituasjon} tilleggsData={tilleggsData} />
            <div className={'flex justify-end'}>
                <Button variant={'primary'} onClick={onClose}>
                    Lukk
                </Button>
            </div>
        </>
    );
};

export default Steg3;
