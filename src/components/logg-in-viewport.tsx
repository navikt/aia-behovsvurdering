import { useInView, defaultFallbackInView } from 'react-intersection-observer';
import { loggVisning, VisningsData } from '../lib/amplitude';

type Props = {
    data: VisningsData;
};

const LoggInViewport = (props: Props) => {
    defaultFallbackInView(true);
    const { ref } = useInView({
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                loggVisning(props.data);
            }
        },
    });
    return <div ref={ref} />;
};

export default LoggInViewport;
