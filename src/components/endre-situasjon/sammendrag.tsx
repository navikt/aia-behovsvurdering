import { BodyShort, Button, Heading, ReadMore } from '@navikt/ds-react';
import { useState } from 'react';
import PermittertModal from './permittert-modal';
import {
    hentSisteOpplysningerOmArbeidssoker,
    Jobbsituasjon,
    lagHentTekstForSprak,
    PermittertSvar,
    SPORSMAL_TEKSTER,
} from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../contexts/sprak';
import { dialogLenke } from '../../urls';
import { OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils/dist/models/opplysninger-om-arbeidssoker';
import { OnOppdaterOpplysninger } from '../../types/oppdater-opplysninger';
import TilleggsData from './tilleggsdata';
import { mapJobbsituasjonTilTilleggsData } from '../../lib/map-tilleggsdata';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';

function mapBeskrivelseTilPermittertSvar(jobbsituasjon: Jobbsituasjon): PermittertSvar {
    switch (jobbsituasjon.beskrivelse) {
        case 'HAR_BLITT_SAGT_OPP':
            return PermittertSvar.OPPSIGELSE;
        case 'ER_PERMITTERT': {
            if (Boolean(jobbsituasjon.detaljer.gjelder_til_dato_iso8601)) {
                return PermittertSvar.TILBAKE_TIL_JOBB;
            } else if (Boolean(jobbsituasjon.detaljer.prosent)) {
                return PermittertSvar.ENDRET_PERMITTERINGSPROSENT;
            }
            return 'ER_PERMITTERT' as any;
        }
        case 'HAR_SAGT_OPP':
            return PermittertSvar.SAGT_OPP;
        default:
            return jobbsituasjon.beskrivelse as PermittertSvar;
    }
}

interface Props {
    opplysninger: OpplysningerOmArbeidssokerResponse;
    sprak: Sprak;
    onOppdaterOpplysninger: OnOppdaterOpplysninger;
}
const Sammendrag = (props: Props) => {
    const { sprak, onOppdaterOpplysninger } = props;
    const harOpplysninger = props.opplysninger?.length > 0;
    const opplysninger = hentSisteOpplysningerOmArbeidssoker(props.opplysninger);
    const [openEndreModal, setOpenEndreModal] = useState(false);
    const sporsmalTekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, sprak);
    const handleEndreModalOpen = (event: any) => {
        event.preventDefault();
        setOpenEndreModal(true);
    };

    const harOppdaterteOpplysninger = props.opplysninger?.length > 1;
    const situasjon = harOpplysninger ? mapBeskrivelseTilPermittertSvar(opplysninger.jobbsituasjon[0]) : null;

    if (!harPermittertSituasjon(props.opplysninger)) {
        return null;
    }

    return (
        <div className={'flex flex-col'}>
            <Heading size="small">{(situasjon && sporsmalTekst(situasjon)) ?? 'Min jobbsituasjon: ukjent'}</Heading>
            {harOppdaterteOpplysninger && (
                <TilleggsData
                    verdi={situasjon ?? null}
                    tilleggsData={
                        situasjon ? (mapJobbsituasjonTilTilleggsData(opplysninger?.jobbsituasjon[0]) as any) : null
                    }
                />
            )}
            <BodyShort className={'mb-6 mt-6'}>
                <Button variant={'secondary'} onClick={handleEndreModalOpen}>
                    Jobbsituasjonen min har endret seg
                </Button>
            </BodyShort>
            <ReadMore header={'Når og hvorfor skal jeg si ifra om endringer?'}>
                <BodyShort className={'mb-6'}>
                    Hvis det skjer endringer i jobbsituasjonen din, kan det påvirke oppfølgingen eller utbetalingen du
                    får fra NAV.
                </BodyShort>
                <BodyShort className={'mb-6'}>
                    Endringer i jobbsituasjonen kan eksempelvis være at du ikke lenger er permittert eller at bedriften
                    har gått konkurs.
                </BodyShort>
                <BodyShort>
                    Om andre forhold i situasjonen din endrer seg, som for eksempel inntekten din eller
                    familiesituasjonen, må du <a href={dialogLenke}>gi beskjed til NAV</a> og beskrive hva som har
                    skjedd.
                </BodyShort>
            </ReadMore>
            <PermittertModal
                openModal={openEndreModal}
                setOpenModal={setOpenEndreModal}
                opplysninger={opplysninger}
                sprak={sprak}
                onOppdaterOpplysninger={onOppdaterOpplysninger}
            />
        </div>
    );
};

export default Sammendrag;
