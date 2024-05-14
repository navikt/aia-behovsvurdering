import {
    DinSituasjon,
    mapSituasjonTilBeskrivelse,
    OpplysningerOmArbeidssoker,
    PermittertSvar,
} from '@navikt/arbeidssokerregisteret-utils';
import fetcher from './http';
import { OPPDATER_OPPLYSNINGER_URL, OPPRETT_OPPGAVE_URL } from '../urls/api';
import { TilleggsdataType } from '../types/tilleggsdata';
import { LagreOpplysningerPayload } from '../types/oppdater-opplysninger';
import { mapTilleggsDataTilJobbdetaljer } from './map-tilleggsdata';

async function opprettOppgave(data: {
    oppgaveBeskrivelse?: string;
    valgtSituasjon?: DinSituasjon | PermittertSvar;
}): Promise<null | { id: string }> {
    if (!data.oppgaveBeskrivelse) {
        return Promise.resolve(null);
    }

    return fetcher(OPPRETT_OPPGAVE_URL, {
        method: 'POST',
        body: JSON.stringify({
            beskrivelse: data.oppgaveBeskrivelse,
            dinSituasjon: data.valgtSituasjon,
        }),
    });
}

// async function opprettDialog(data: {
//     tekst?: string;
//     overskrift?: string;
//     venterPaaSvarFraNav?: boolean;
// }): Promise<null | { id: string }> {
//     if (!data.tekst && !data.overskrift) {
//         return Promise.resolve(null);
//     }
//
//     return fetcher(OPPRETT_DIALOG_URL, {
//         method: 'POST',
//         body: JSON.stringify({
//             tekst: data.tekst,
//             overskrift: data.overskrift,
//             venterPaaSvarFraNav: data.venterPaaSvarFraNav,
//         }),
//     });
// }

export function mapOppdateringTilOpplysningerPayload(
    oppdatering: LagreOpplysningerPayload['oppdatering'],
    opplysninger: OpplysningerOmArbeidssoker = {} as OpplysningerOmArbeidssoker,
): {
    opplysningerOmArbeidssoeker: {
        utdanning: OpplysningerOmArbeidssoker['utdanning'];
        helse: OpplysningerOmArbeidssoker['helse'];
        annet: OpplysningerOmArbeidssoker['annet'];
        jobbsituasjon: {
            beskrivelser: OpplysningerOmArbeidssoker['jobbsituasjon'];
        };
    };
} {
    const tilleggsData = oppdatering.dinSituasjon.tilleggsData;
    const beskrivelse = oppdatering.dinSituasjon.verdi;

    const detaljer = tilleggsData
        ? Object.keys(tilleggsData).reduce((val, key) => {
              const mappedKey = mapTilleggsDataTilJobbdetaljer(key as keyof TilleggsdataType, beskrivelse);
              if (!mappedKey) {
                  return val;
              }

              return {
                  ...val,
                  [mappedKey]: tilleggsData[key as keyof TilleggsdataType],
              };
          }, {})
        : {};

    const eksisterendeJobbsituasjonDetaljer =
        Array.isArray(opplysninger.jobbsituasjon) && opplysninger.jobbsituasjon[0]?.detaljer;

    return {
        opplysningerOmArbeidssoeker: {
            utdanning: opplysninger.utdanning,
            helse: opplysninger.helse,
            annet: opplysninger.annet,
            jobbsituasjon: {
                beskrivelser: [
                    {
                        beskrivelse: mapSituasjonTilBeskrivelse(oppdatering.dinSituasjon.verdi),
                        detaljer: {
                            ...(eksisterendeJobbsituasjonDetaljer ?? {}),
                            ...detaljer,
                        },
                    },
                ],
            },
        },
    };
}

async function endreOpplysninger(
    data: LagreOpplysningerPayload,
    erOpprettOppgaveToggletPaa: boolean,
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssoker,
) {
    if (erOpprettOppgaveToggletPaa) {
        await opprettOppgave(data);
    }
    // await opprettDialog(data);
    return fetcher(OPPDATER_OPPLYSNINGER_URL, {
        method: 'POST',
        body: JSON.stringify(mapOppdateringTilOpplysningerPayload(data.oppdatering, opplysningerOmArbeidssoker)),
    });
}

// Bruk via OpplysningerOmArbeidssokerContext.onOppdaterOpplysninger
export default endreOpplysninger;
