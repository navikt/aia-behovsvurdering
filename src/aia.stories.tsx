import { Meta, StoryObj } from '@storybook/react';
import AiA from './aia';
import opplysningerOmArbeidssokerMock from './mocks/opplysninger-om-arbeidssoker-mock';
import arbeidssokerperioderMock from './mocks/arbeidssokerperioder-mock';
import profileringMock from './mocks/profilering-mock';
import behovsvurderingMock from './mocks/behovsvurdering-mock';
import moetestoetteMock from './mocks/moetestoette-mock';

const meta = {
    title: 'AiA',
    component: AiA,
    decorators: [],
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
    args: {},
} satisfies Meta<typeof AiA>;

export default meta;
type Story = StoryObj<typeof meta>;

function onOppdaterOpplysninger() {
    console.log(arguments);
    return Promise.resolve();
}
export const Arbeidssøker: Story = {
    args: {
        sprak: 'nb',
        opplysningerOmArbeidssoker: opplysningerOmArbeidssokerMock as any,
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: null,
        onOppdaterOpplysninger,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const ManglerOpplysninger: Story = {
    args: {
        sprak: 'nb',
        opplysningerOmArbeidssoker: [],
        profilering: [],
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: null,
        onOppdaterOpplysninger,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const ErPermittert: Story = {
    args: {
        sprak: 'nb',
        opplysningerOmArbeidssoker: [
            {
                ...opplysningerOmArbeidssokerMock[0],
                jobbsituasjon: [
                    {
                        beskrivelse: 'ER_PERMITTERT',
                        detaljer: {
                            stilling_styrk08: '7213',
                            stilling: 'Bilskadereparatør',
                        },
                    },
                ],
            },
        ] as any,
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: behovsvurderingMock as any,
        onOppdaterOpplysninger,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const IkkeAktivArbeidssoker: Story = {
    args: {
        sprak: 'nb',
        opplysningerOmArbeidssoker: [],
        profilering: [],
        arbeidssokerperioder: [] as any,
        behovsvurdering: null,
        onOppdaterOpplysninger,
        moetestoette: [] as any,
        siste14aVedtak: [] as any,
    },
};
