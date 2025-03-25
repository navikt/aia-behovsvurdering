import Behovsvurdering from './aia';
import { useArbeidssokerperioder } from './contexts/arbeidssokerperioder';
import { useProfilering } from './contexts/profilering';
import { useSprakValg } from './contexts/sprak';
import { useBehovsvurdering } from './contexts/behovsvurdering';

function AiaWrapper() {
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const { profilering } = useProfilering();
    const { sprak } = useSprakValg();
    const { behovForVeiledning } = useBehovsvurdering();

    return (
        <Behovsvurdering
            sprak={sprak}
            profilering={profilering}
            arbeidssokerperioder={arbeidssokerperioder}
            behovsvurdering={behovForVeiledning}
        />
    );
}

export default AiaWrapper;
