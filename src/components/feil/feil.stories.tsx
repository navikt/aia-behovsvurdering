import { Meta, StoryObj } from '@storybook/react';
import { Feil } from './feil';

const meta = {
    title: 'Komponenter/Feilmelding',
    component: Feil,
    args: {},
    // tags: ['autodocs'],
} satisfies Meta<typeof Feil>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorBoundaryFeil: Story = {};
