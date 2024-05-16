import AiA from './aia';
import { useArbeidssokerperioder } from './contexts/arbeidssokerperioder';
import { useProfilering } from './contexts/profilering';
import { useSprakValg } from './contexts/sprak';
import { useBehovsvurdering } from './contexts/behovsvurdering';
import { useMoetestoette } from './contexts/moetestoette';
import { useVedtaksstoette } from './contexts/vedtaksstoette';

function AiaWrapper() {
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const { profilering } = useProfilering();
    const { sprak } = useSprakValg();
    const { behovForVeiledning } = useBehovsvurdering();
    const { moetestoette } = useMoetestoette();
    const { siste14avedtak } = useVedtaksstoette();

    return (
        <AiA
            sprak={sprak}
            profilering={profilering}
            arbeidssokerperioder={arbeidssokerperioder}
            behovsvurdering={behovForVeiledning}
            moetestoette={moetestoette}
            siste14aVedtak={siste14avedtak}
        />
    );
}

export default AiaWrapper;
