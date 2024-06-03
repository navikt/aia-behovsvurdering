import Behovsvurdering from './aia';
import { useArbeidssokerperioder } from './contexts/arbeidssokerperioder';
import { useProfilering } from './contexts/profilering';
import { useSprakValg } from './contexts/sprak';
import { useBehovsvurdering } from './contexts/behovsvurdering';
import { useMoetestoette } from './contexts/moetestoette';

function AiaWrapper() {
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const { profilering } = useProfilering();
    const { sprak } = useSprakValg();
    const { behovForVeiledning } = useBehovsvurdering();
    const { moetestoette } = useMoetestoette();

    return (
        <Behovsvurdering
            sprak={sprak}
            profilering={profilering}
            arbeidssokerperioder={arbeidssokerperioder}
            behovsvurdering={behovForVeiledning}
            moetestoette={moetestoette}
        />
    );
}

export default AiaWrapper;
