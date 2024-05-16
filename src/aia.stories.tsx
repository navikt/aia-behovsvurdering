import { Meta, StoryObj } from '@storybook/react';
import AiA from './aia';
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

export const Arbeidssøker: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: null,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const ManglerOpplysninger: Story = {
    args: {
        sprak: 'nb',
        profilering: [],
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: null,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const ErPermittert: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: behovsvurderingMock as any,
        moetestoette: moetestoetteMock as any,
        siste14aVedtak: [] as any,
    },
};

export const IkkeAktivArbeidssoker: Story = {
    args: {
        sprak: 'nb',
        profilering: [],
        arbeidssokerperioder: [] as any,
        behovsvurdering: null,
        moetestoette: [] as any,
        siste14aVedtak: [] as any,
    },
};
