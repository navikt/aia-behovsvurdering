import { Meta, StoryObj } from '@storybook/react';
import { ProfileringResponse, ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils';

import { BehovsavklaringKort } from './behovsavklaring-kort';
import profileringMock from '../../mocks/profilering-mock';
import behovsvurderingMock from '../../mocks/behovsvurdering-mock';
import moetestoetteMock from '../../mocks/moetestoette-mock';
import arbeidssokerperioderMock from '../../mocks/arbeidssokerperioder-mock';

const meta = {
    title: 'Komponenter/Behovsavklaring',
    component: BehovsavklaringKort,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof BehovsavklaringKort>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Behovsavklaringskomponent: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as ProfileringResponse,
        behovsvurdering: behovsvurderingMock as any,
        moetestoette: moetestoetteMock as any,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};

export const BehovsvurderingIkkeAvklartStandard: Story = {
    args: {
        sprak: 'nb',
        profilering: [
            {
                ...profileringMock[0],
                profilertTil: 'ANTATT_GODE_MULIGHETER',
            },
        ] as ProfileringResponse,
        behovsvurdering: null,
        moetestoette: null,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};

export const BehovsvurderingAvklartStandard: Story = {
    args: {
        sprak: 'nb',
        profilering: [
            {
                ...profileringMock[0],
                profilertTil: 'ANTATT_GODE_MULIGHETER',
            },
        ] as ProfileringResponse,
        behovsvurdering: behovsvurderingMock,
        moetestoette: null,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};

export const BehovsvurderingIkkeAvklartSituasjonsbestemt: Story = {
    args: {
        sprak: 'nb',
        profilering: [
            {
                ...profileringMock[0],
                profilertTil: 'ANTATT_BEHOV_FOR_VEILEDNING',
            },
        ] as ProfileringResponse,
        behovsvurdering: null,
        moetestoette: null,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};

export const BehovsvurderingAvklartSituasjonsbestemt: Story = {
    args: {
        sprak: 'nb',
        profilering: [
            {
                ...profileringMock[0],
                profilertTil: 'ANTATT_BEHOV_FOR_VEILEDNING',
            },
        ] as ProfileringResponse,
        behovsvurdering: behovsvurderingMock,
        moetestoette: null,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};

export const Møtestøtte: Story = {
    args: {
        sprak: 'nb',
        profilering: [
            {
                ...profileringMock[0],
                profilertTil: 'OPPGITT_HINDRINGER',
            },
        ] as ProfileringResponse,
        behovsvurdering: null,
        moetestoette: null,
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};
