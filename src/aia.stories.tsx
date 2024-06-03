import { Meta, StoryObj } from '@storybook/react';
import Behovsvurdering, { BehovsvurderingProps } from './aia';
import arbeidssokerperioderMock from './mocks/arbeidssokerperioder-mock';
import profileringMock from './mocks/profilering-mock';
import moetestoetteMock from './mocks/moetestoette-mock';
import { http, HttpResponse } from 'msw';
import { BEHOV_FOR_VEILEDNING_URL, OPPRETT_DIALOG_URL } from './urls/api';
import { BehovsvurderingProvider, useBehovsvurdering } from './contexts/behovsvurdering';

function BehovsvurderingsWrapper(props: BehovsvurderingProps) {
    const { behovForVeiledning } = useBehovsvurdering();
    return <Behovsvurdering {...props} behovsvurdering={behovForVeiledning} />;
}

const meta = {
    title: 'Behovsvurdering',
    component: BehovsvurderingsWrapper,
    decorators: [
        (Story, ctx) => (
            <BehovsvurderingProvider>
                <Story />
            </BehovsvurderingProvider>
        ),
    ],
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
        },
        msw: {
            handlers: [
                http.post(OPPRETT_DIALOG_URL, () => HttpResponse.json({ id: '1234' })),
                http.post(BEHOV_FOR_VEILEDNING_URL, async ({ request }) => {
                    const data = (await request.json()) as any;
                    return HttpResponse.json({
                        dato: new Date().toISOString().substring(0, 10),
                        oppfolging: data.oppfolging,
                    });
                }),
                http.get(BEHOV_FOR_VEILEDNING_URL, () => new HttpResponse(null, { status: 204 })),
            ],
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
