import React from 'react';
import { Button, Select } from '@navikt/ds-react';
import {
    PermittertSvar,
    DinSituasjon,
    lagHentTekstForSprak,
    SPORSMAL_TEKSTER,
} from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../contexts/sprak';

type SituasjonSvar = PermittertSvar | DinSituasjon;

interface Steg1Props {
    valgtSituasjon: SituasjonSvar | undefined | '-1';
    opprinneligSituasjon: SituasjonSvar | undefined;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<SituasjonSvar>>;
    onClick: () => void;
    sprak: Sprak;
}

const standardSvarSomSkalFjernes: SituasjonSvar[] = [DinSituasjon.HAR_SAGT_OPP, DinSituasjon.MISTET_JOBBEN];

const Steg1 = (props: Steg1Props) => {
    const { valgtSituasjon, settValgtSituasjon, onClick, sprak } = props;
    const svarTekster = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);

    return (
        <>
            <Select
                className={'mb-4'}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as SituasjonSvar)}
                value={valgtSituasjon}
            >
                <option disabled={true} value={'-1'}>
                    Velg blant situasjonene nedenfor
                </option>
                {Object.keys(PermittertSvar).map((situasjon) => {
                    if (standardSvarSomSkalFjernes.includes(situasjon as SituasjonSvar)) return null;
                    return (
                        <option key={situasjon} value={situasjon}>
                            {svarTekster(situasjon)}
                        </option>
                    );
                })}
            </Select>
            <div className={'flex justify-end'}>
                <Button variant={'primary'} onClick={onClick} disabled={valgtSituasjon === '-1'}>
                    Neste
                </Button>
            </div>
        </>
    );
};

export default Steg1;
