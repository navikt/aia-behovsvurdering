import { JaEllerNei, OpplysningerOmArbeidssoker } from '@navikt/arbeidssokerregisteret-utils';
import { UtdanningGodkjentValg } from '@navikt/arbeidssokerregisteret-utils/dist/models/sporsmal';

const opplysningerOmArbeidssoker: OpplysningerOmArbeidssoker[] = [
    {
        opplysningerOmArbeidssoekerId: '9077e4b5-807c-4568-9e04-8bf06e49d9fc',
        periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
        sendtInnAv: {
            tidspunkt: '2024-03-14T13:15:48.969Z',
            utfoertAv: {
                type: 'VEILEDER',
            },
            kilde: 'paw-arbeidssoekerregisteret-inngang',
            aarsak: 'opplysning om arbeidssøker sendt inn',
        },
        utdanning: {
            nus: '4',
            bestaatt: 'JA' as JaEllerNei,
            godkjent: 'JA' as UtdanningGodkjentValg,
        },
        helse: {
            helsetilstandHindrerArbeid: 'NEI' as JaEllerNei,
        },
        annet: {
            andreForholdHindrerArbeid: 'NEI' as JaEllerNei,
        },
        jobbsituasjon: [
            {
                beskrivelse: 'HAR_SAGT_OPP',
                detaljer: {
                    stilling_styrk08: '7213',
                    stilling: 'Bilskadereparatør',
                },
            },
        ],
    },
];
export default opplysningerOmArbeidssoker;
