import { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileringResponse, ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils';

import { BehovsavklaringKort } from './behovsavklaring-kort';
import profileringMock from '../../mocks/profilering-mock';
import behovsvurderingMock from '../../mocks/behovsvurdering-mock';
import arbeidssokerperioderMock from '../../mocks/arbeidssokerperioder-mock';
import { http, HttpResponse } from 'msw';
import { BEHOVSVURDERING_URL, OPPRETT_DIALOG_URL } from '../../urls/api';

const meta = {
    title: 'Komponenter/Behovsavklaring',
    component: BehovsavklaringKort,
    decorators: [],
    tags: ['autodocs'],
    args: {},
    parameters: {
        backgrounds: {
            default: 'dark',
        },
        msw: {
            handlers: [
                http.post(OPPRETT_DIALOG_URL, () => HttpResponse.json({ id: '1234' })),
                http.post(BEHOVSVURDERING_URL, () =>
                    HttpResponse.json({
                        dato: new Date().toISOString().substring(0, 10),
                        oppfolging: 'STANDARD_INNSATS',
                    }),
                ),
            ],
        },
    },
} satisfies Meta<typeof BehovsavklaringKort>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Behovsavklaringskomponent: Story = {
    args: {
        sprak: 'nb',
        profilering: profileringMock as ProfileringResponse,
        behovsvurdering: behovsvurderingMock as any,
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
        arbeidssoekerperioder: arbeidssokerperioderMock as ArbeidssokerperioderResponse,
    },
};
