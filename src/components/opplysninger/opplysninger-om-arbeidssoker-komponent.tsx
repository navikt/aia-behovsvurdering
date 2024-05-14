import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Svar,
} from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort } from '@navikt/ds-react';

import { Sprak } from '../../contexts/sprak';
import Oppfolging from './oppfolging';

import prettyPrintDato from '../../lib/pretty-print-dato';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils/dist/models/arbeidssokerperiode';
import { BehovsvurderingResponse } from '../../contexts/behovsvurdering';

type OpplysningProps = { sporsmal: string; svar: Svar | string };

const Opplysning = (props: OpplysningProps & { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, props.sprak);
    const { sporsmal, svar } = props;

    return (
        <div className={'mb-5'}>
            <BodyShort>
                <strong>{tekst(sporsmal)}</strong>
                <br />
                {tekst(svar as string) ?? svar}
            </BodyShort>
        </div>
    );
};

function getSisteStillingSvar(opplysninger: OpplysningerOmArbeidssoker) {
    const detaljer = opplysninger.jobbsituasjon[0]?.detaljer;
    return detaljer?.stilling || 'Ikke oppgitt';
}

function mapOpplysninger(opplysninger: OpplysningerOmArbeidssoker, sprak: Sprak): OpplysningProps[] {
    const result: OpplysningProps[] = [
        {
            sporsmal: SporsmalId.dinSituasjon,
            svar: opplysninger.jobbsituasjon[0].beskrivelse,
        },
        {
            sporsmal: SporsmalId.sisteStilling,
            svar: getSisteStillingSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.utdanning,
            svar: mapNusKodeTilUtdannignsnivaa(opplysninger.utdanning.nus),
        },
        {
            sporsmal: SporsmalId.utdanningBestatt,
            svar: opplysninger.utdanning.bestaatt,
        },
        {
            sporsmal: SporsmalId.utdanningGodkjent,
            svar: opplysninger.utdanning.godkjent,
        },
        {
            sporsmal: SporsmalId.helseHinder,
            svar: opplysninger.helse.helsetilstandHindrerArbeid,
        },
    ];

    return result;
}

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
    periode: ArbeidssokerPeriode;
    behovsvurdering: BehovsvurderingResponse;
};

function OpplysningerOmArbeidssokerKomponent(props: Props) {
    const { opplysninger, periode, sprak, behovsvurdering } = props;
    const opprettetDato = periode.startet.tidspunkt;
    const erRegistrertAvSluttbruker = opplysninger.sendtInnAv.utfoertAv.type === 'SLUTTBRUKER';
    const besvarelser = mapOpplysninger(opplysninger, sprak);

    return (
        <div className={'flex flex-col'}>
            <div className={'mb-5'}>
                <BodyShort>
                    Du kan endre opplysningene du ga ved å kontakte NAV.
                    <br />
                    Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.
                </BodyShort>
            </div>
            <div className={'mb-5'}>
                <strong>Registrering</strong>
                <div className={'flex items-center flex-wrap'}>
                    <div className={'flex items-center flex-wrap'}>
                        {erRegistrertAvSluttbruker ? 'Du' : 'NAV'} registrerte deg som arbeidssøker{' '}
                        {prettyPrintDato(opprettetDato)}
                    </div>
                </div>
            </div>
            <Oppfolging sprak={sprak} behovsvurdering={behovsvurdering} />
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} sprak={props.sprak} />
            ))}
        </div>
    );
}

export default OpplysningerOmArbeidssokerKomponent;
