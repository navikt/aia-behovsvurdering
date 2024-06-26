import { BodyShort, ReadMore } from '@navikt/ds-react';
import { loggAktivitet } from '../../lib/amplitude';
import { useState } from 'react';

function Innhold() {
    return (
        <div>
            <BodyShort spacing>
                Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på veien
                til arbeid.
            </BodyShort>
            <BodyShort spacing>
                Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                dagpengesøknaden, utbetaling av dagpenger eller utfylling av meldekort.
            </BodyShort>
        </div>
    );
}

function ReadMoreVeileder() {
    const [clickedReadMoreHjelp, setClickedReadMore] = useState<boolean>(false);

    const handleClickReadMore = () => {
        if (!clickedReadMoreHjelp) {
            loggAktivitet({ aktivitet: 'Trykker på "Readmore: Hva slags hjelp kan du få"' });
            setClickedReadMore(true);
        }
    };
    return (
        <ReadMore
            size="medium"
            header="Hva slags hjelp kan du få fra en veileder?"
            onClick={() => handleClickReadMore()}
        >
            <Innhold />
        </ReadMore>
    );
}

export default ReadMoreVeileder;
