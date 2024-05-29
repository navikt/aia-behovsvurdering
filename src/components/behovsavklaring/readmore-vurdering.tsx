import { BodyShort, List, ReadMore } from '@navikt/ds-react';
import { loggAktivitet } from '../../lib/amplitude';

function ReadMoreVurdering() {
    return (
        <ReadMore
            size="medium"
            header="Hvordan vurderer vi ditt behov for veiledning?"
            onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Readmore: Hvordan vurderer vi ditt behov"' })}
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
