import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import Sammendrag from './sammendrag';
import { http, HttpResponse } from 'msw';
import { OPPDATER_OPPLYSNINGER_URL, OPPRETT_DIALOG_URL, OPPRETT_OPPGAVE_URL } from '../../urls/api';
import endreOpplysninger, { mapOppdateringTilOpplysningerPayload } from '../../lib/endre-opplysninger';
import { JaEllerNei } from '@navikt/arbeidssokerregisteret-utils';
import { UtdanningGodkjentValg } from '@navikt/arbeidssokerregisteret-utils/dist/models/sporsmal';
import { OnOppdaterOpplysninger } from '../../types/oppdater-opplysninger';

const meta = {
    title: 'Komponenter/EndreSituasjon',
    component: Sammendrag,
    decorators: [],
    tags: ['autodocs'],
    parameters: {
        msw: {
            handlers: [
                http.post(OPPRETT_OPPGAVE_URL, () => {
                    return new HttpResponse(null, { status: 204 });
                }),
                http.post(OPPRETT_DIALOG_URL, () => {
                    return new HttpResponse(null, { status: 204 });
                }),
                http.post(OPPDATER_OPPLYSNINGER_URL, async () => {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(true);
                        }, 2000);
                    });
                    return new HttpResponse(null, { status: 204 });
                }),
            ],
        },
    },
} satisfies Meta<typeof Sammendrag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EndreSituasjon: Story = {
    args: {
        sprak: 'nb',
        opplysninger: [
            {
                sendtInnAv: {
                    tidspunkt: '2024-03-14T13:15:48.969Z',
                },
                periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
                utdanning: {
                    nus: '4',
                    bestaatt: 'JA',
                    godkjent: 'JA',
                },
                jobbsituasjon: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            stilling_styrk08: '7213',
                            stilling: 'Bilskadereparatør',
                        },
                    },
                ],
            } as any,
        ],
        onOppdaterOpplysninger: () => Promise.resolve(), // brukes ikke
    },
    render(args) {
        const [{ opplysninger }, updateArgs] = useArgs();
        const onOppdaterOpplysninger: OnOppdaterOpplysninger = async (data, _, opplysningerOmArbeidssoker) => {
            await endreOpplysninger(data, true, opplysningerOmArbeidssoker);
            opplysninger.push({
                ...opplysninger[0],
                jobbsituasjon: mapOppdateringTilOpplysningerPayload(data.oppdatering, opplysningerOmArbeidssoker)
                    .opplysningerOmArbeidssoeker.jobbsituasjon.beskrivelser,
                sendtInnAv: {
                    tidspunkt: new Date().toISOString(),
                },
            });
            updateArgs({ opplysninger });
        };
        return <Sammendrag {...args} onOppdaterOpplysninger={onOppdaterOpplysninger} />;
    },
};

export const MedEndringer: Story = {
    args: {
        sprak: 'nb',
        opplysninger: [
            {
                periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
                sendtInnAv: {
                    tidspunkt: '2024-03-14T13:15:48.969Z',
                },
                utdanning: {
                    nus: '4',
                    bestaatt: 'JA' as JaEllerNei,
                    godkjent: 'JA' as UtdanningGodkjentValg,
                },
                helse: {
                    helseTilstandHindrerArbeid: 'NEI' as JaEllerNei,
                },
                annet: {
                    andreForholdHindrerArbeid: 'NEI' as JaEllerNei,
                },
                jobbsituasjon: [
                    {
                        beskrivelse: 'HAR_BLITT_SAGT_OPP',
                        detaljer: {
                            gjelder_fra_dato_iso8601: '2024-02-25',
                            siste_dag_med_loenn_iso8601: '2024-03-29',
                            stilling_styrk08: '7213',
                            stilling: 'Bilskadereparatør',
                        },
                    },
                ],
            } as any,
            {
                periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
                sendtInnAv: {
                    tidspunkt: '2024-03-14T13:15:48.969Z',
                },
                utdanning: {
                    nus: '4',
                    bestaatt: 'JA' as JaEllerNei,
                    godkjent: 'JA' as UtdanningGodkjentValg,
                },
                helse: {
                    helseTilstandHindrerArbeid: 'NEI' as JaEllerNei,
                },
                annet: {
                    andreForholdHindrerArbeid: 'NEI' as JaEllerNei,
                },
                jobbsituasjon: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            stilling_styrk08: '7213',
                            stilling: 'Bilskadereparatør',
                        },
                    },
                ],
            } as any,
        ],
        onOppdaterOpplysninger: () => Promise.resolve(),
    },
};

export const LagringFeiler: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(OPPRETT_OPPGAVE_URL, () => {
                    return new HttpResponse(null, { status: 204 });
                }),
                http.post(OPPRETT_DIALOG_URL, () => {
                    return new HttpResponse(null, { status: 204 });
                }),
                http.post(OPPDATER_OPPLYSNINGER_URL, async () => {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(true);
                        }, 2000);
                    });
                    return new HttpResponse(null, { status: 400 });
                }),
            ],
        },
    },
    args: {
        sprak: 'nb',
        opplysninger: [
            {
                periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
                utdanning: {
                    nus: '4',
                    bestaatt: 'JA',
                    godkjent: 'JA',
                },
                jobbsituasjon: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            stilling_styrk08: '7213',
                            stilling: 'Bilskadereparatør',
                        },
                    },
                ],
            } as any,
        ],
        onOppdaterOpplysninger: async (data, toggle, opplysninger) => {
            await endreOpplysninger(data, toggle, opplysninger);
        },
    },
};
