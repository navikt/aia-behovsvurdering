import { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundaryFeil } from './error-boundary-feil';

const meta = {
    title: 'Komponenter/Feilmelding',
    component: ErrorBoundaryFeil,
    args: {},
    // tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundaryFeil>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorBoundaryFeilKomponent: Story = {
    args: {
        error: new Error('ErrorBoundaryFeil'),
        resetErrorBoundary: () => {},
    },
};
