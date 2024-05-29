import { BodyShort, List, ReadMore } from '@navikt/ds-react';
import { loggAktivitet } from '../../lib/amplitude';
import { useState } from 'react';

function ReadMoreVurdering() {
    const [clickedReadMorebehov, setClickedReadMore] = useState<boolean>(false);

    const handleClickReadMore = () => {
        if (!clickedReadMorebehov) {
            loggAktivitet({ aktivitet: 'Trykker på "Readmore: Hvordan vurderer vi ditt behov"' });
            setClickedReadMore(true);
        }
    };
    return (
        <ReadMore
            size="medium"
            header="Hvordan vurderer vi ditt behov for veiledning?"
            onClick={() => handleClickReadMore()}
        >
            <BodyShort>Vår vurdering er basert på:</BodyShort>
            <List as="ul">
                <List.Item>dine svar fra registreringen</List.Item>
                <List.Item>opplysningene NAV har om din situasjon</List.Item>
                <List.Item>det du selv mener</List.Item>
            </List>
        </ReadMore>
    );
}

export default ReadMoreVurdering;
