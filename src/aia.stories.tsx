import { Meta, StoryObj } from '@storybook/react';
import Behovsvurdering from './aia';
import arbeidssokerperioderMock from './mocks/arbeidssokerperioder-mock';
import profileringMock from './mocks/profilering-mock';
import behovsvurderingMock from './mocks/behovsvurdering-mock';
import moetestoetteMock from './mocks/moetestoette-mock';

const meta = {
    title: 'Behovsvurdering',
    component: Behovsvurdering,
    decorators: [],
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
    args: {},
} satisfies Meta<typeof Behovsvurdering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arbeidssøker: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: null,
        moetestoette: moetestoetteMock as any,
    },
};

export const ErPermittert: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as any,
        arbeidssokerperioder: arbeidssokerperioderMock as any,
        behovsvurdering: behovsvurderingMock as any,
        moetestoette: moetestoetteMock as any,
    },
};
