import { DinSituasjon, OpplysningerOmArbeidssoker, PermittertSvar } from '@navikt/arbeidssokerregisteret-utils';
import { TilleggsdataType } from './tilleggsdata';

export interface LagreOpplysningerPayload {
    tekst: string;
    overskrift: string;
    oppgaveBeskrivelse?: string;
    venterPaaSvarFraNav: boolean;
    valgtSituasjon: DinSituasjon | PermittertSvar;
    oppdatering: {
        dinSituasjon: {
            verdi: PermittertSvar | DinSituasjon;
            tilleggsData?: TilleggsdataType;
        };
    };
}

export type OnOppdaterOpplysninger = (
    data: LagreOpplysningerPayload,
    erOpprettOppgaveToggletPaa: boolean,
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssoker,
) => Promise<void>;
