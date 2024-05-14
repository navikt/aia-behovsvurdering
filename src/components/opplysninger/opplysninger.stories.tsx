import { Meta, StoryObj } from '@storybook/react';
import OpplysningerOmArbeidssokerKomponent from './opplysninger-om-arbeidssoker-komponent';
import opplysningerOmArbeidssoker from '../../mocks/opplysninger-om-arbeidssoker-mock';
import arbeidssokerperioderMock from '../../mocks/arbeidssokerperioder-mock';
import behovsvurderingMock from '../../mocks/behovsvurdering-mock';

const meta = {
    title: 'Komponenter/OpplysningerOmArbeidssoker',
    component: OpplysningerOmArbeidssokerKomponent,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof OpplysningerOmArbeidssokerKomponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpplysningerOmArbeidssoker: Story = {
    args: {
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        periode: arbeidssokerperioderMock[0] as any,
        behovsvurdering: behovsvurderingMock,
    },
};
