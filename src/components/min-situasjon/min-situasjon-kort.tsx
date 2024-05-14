import { AiaProps } from '../../aia';
import { Box } from '@navikt/ds-react';
import Sammendrag from '../endre-situasjon/sammendrag';
import { InnsynLesMer } from '../opplysninger/innsyn';
import {
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker,
} from '@navikt/arbeidssokerregisteret-utils';
import ManglerOpplysninger from '../opplysninger/mangler-opplysninger';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';

const MinSituasjonKort = (props: AiaProps) => {
    const { sprak, opplysningerOmArbeidssoker, onOppdaterOpplysninger, arbeidssokerperioder, behovsvurdering } = props;

    const manglerOpplysninger = opplysningerOmArbeidssoker.length === 0;
    const erPermittert = !manglerOpplysninger && harPermittertSituasjon(opplysningerOmArbeidssoker);
    const periode = hentSisteArbeidssokerPeriode(arbeidssokerperioder);

    return (
        <Box background="surface-default" padding="4" borderRadius="xlarge">
            {manglerOpplysninger && <ManglerOpplysninger sprak={sprak} />}
            {erPermittert && (
                <Sammendrag
                    sprak={sprak}
                    opplysninger={opplysningerOmArbeidssoker}
                    onOppdaterOpplysninger={onOppdaterOpplysninger}
                />
            )}
            {!manglerOpplysninger && (
                <InnsynLesMer
                    periode={periode}
                    sprak={sprak}
                    opplysninger={hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoker)}
                    behovsvurdering={behovsvurdering}
                />
            )}
        </Box>
    );
};

export default MinSituasjonKort;
