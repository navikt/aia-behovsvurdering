import { Alert } from '@navikt/ds-react';
import { FallbackProps } from 'react-error-boundary';
import { loggVisning } from '../../lib/amplitude';
import { useEffect } from 'react';

export const ErrorBoundaryFeil = (props: FallbackProps) => {
    const { error } = props;

    useEffect(() => {
        loggVisning({ viser: 'ErrorBoundaryFeil', error: error?.message, stack: error?.stack });
    }, []);

    return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
};
