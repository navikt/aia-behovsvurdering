import { BodyShort } from '@navikt/ds-react';
import { TilleggsdataType } from '../../types/tilleggsdata';
import prettyPrintDato from '../../lib/pretty-print-dato';
import { PermittertSvar } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    verdi: string | null;
    tilleggsData: TilleggsdataType | undefined;
}

interface TilleggsDataProps {
    tilleggsData: TilleggsdataType | null;
}

function TilleggsData(props: Props) {
    const { verdi, tilleggsData } = props;

    const permitteringsprosentMapping: { [key: string]: string } = {
        '100': 'fullt permittert - 100 prosent',
        '75': 'mellom 50 og 100 prosent',
        '50': 'mindre enn 50 prosent',
    };

    const stillingsprosentMapping: { [key: string]: string } = {
        '100': 'fulltid - 100 prosent',
        '75': 'deltid - mellom 50 og 100 prosent',
        '50': 'deltid - mindre enn 50 prosent',
    };

    const harNyJobbMapping: { [key: string]: string } = {
        ja: 'Jeg har ny jobb å gå til',
        nei: 'Jeg har ikke ny jobb å gå til',
    };

    const TILBAKE_TIL_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        // const { profil } = useProfil();
        // const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;
        // const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);
        return (
            <div className={'my-2'}>
                <BodyShort>
                    Min første arbeidsdag etter permittering er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato as string) : 'ikke oppgitt dato'}
                </BodyShort>
                {stillingsProsent && (
                    <BodyShort>
                        Jeg skal jobbe {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                    </BodyShort>
                )}
                {/*{harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}*/}
            </div>
        );
    };

    const OPPSIGELSE = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        // const { profil } = useProfil();
        // const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        const { oppsigelseDato, sisteArbeidsdagDato, harNyJobb } = tilleggsData;
        // const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

        return (
            <>
                <BodyShort>
                    Oppsigelsen ble mottatt{' '}
                    {oppsigelseDato ? prettyPrintDato(oppsigelseDato as string) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste dag med lønn fra arbeidsgiver er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato as string) : 'ukjent'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
                {/*{harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}*/}
            </>
        );
    };

    const ENDRET_PERMITTERINGSPROSENT = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        // const { profil } = useProfil();
        // const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        // const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);
        const { permitteringsProsent, gjelderFraDato, permitteringForlenget } = tilleggsData;

        const permitteringErForlenget = permitteringForlenget === 'Ja';

        return (
            <>
                {permitteringErForlenget && (
                    <BodyShort>
                        Permitteringen er forlenget fra{' '}
                        {gjelderFraDato ? prettyPrintDato(gjelderFraDato as string) : 'ikke oppgitt dato'}
                    </BodyShort>
                )}
                <BodyShort>
                    Permitteringsgraden er{' '}
                    {permitteringsProsent ? `${permitteringsprosentMapping[permitteringsProsent]}` : 'ikke oppgitt'} fra{' '}
                    {gjelderFraDato ? prettyPrintDato(gjelderFraDato as string) : 'ikke oppgitt dato'}
                </BodyShort>
                {/*{harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}*/}
            </>
        );
    };

    const NY_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato as string) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Jeg skal begynne å jobbe{' '}
                    {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const MIDLERTIDIG_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, stillingsProsent } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato as string) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Jeg skal begynne å jobbe{' '}
                    {stillingsProsent ? stillingsprosentMapping[stillingsProsent] : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const KONKURS = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { sisteArbeidsdagDato, harNyJobb } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Min siste arbeidsdag er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato as string) : 'ikke oppgitt'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
            </>
        );
    };

    const SAGT_OPP = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        // const { profil } = useProfil();
        // const { besvarelse } = useBesvarelse();

        if (!tilleggsData) return null;

        // const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

        const { oppsigelseDato, sisteArbeidsdagDato, harNyJobb, forsteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Jeg har levert oppsigelse{' '}
                    {oppsigelseDato ? prettyPrintDato(oppsigelseDato as string) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste dag i oppsigelsestiden er{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato as string) : 'ikke oppgitt'}
                </BodyShort>
                {harNyJobb && <BodyShort>{harNyJobbMapping[harNyJobb]}</BodyShort>}
                {harNyJobb && harNyJobb === 'ja' && forsteArbeidsdagDato && (
                    <BodyShort>
                        Første arbeidsdag i ny jobb er{' '}
                        {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato as string) : 'ikke oppgitt'}
                    </BodyShort>
                )}
                {/*{harSendtInnDokumentasjon && <BodyShort>Jeg har sendt inn dokumentasjon</BodyShort>}*/}
            </>
        );
    };

    const ANNET = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { gjelderFraDato } = tilleggsData;

        return (
            <BodyShort>
                Datoen for endringen er{' '}
                {gjelderFraDato ? prettyPrintDato(gjelderFraDato as string) : 'ikke oppgitt dato'}
            </BodyShort>
        );
    };

    if (!tilleggsData || !verdi) return null;

    if (verdi === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
        return <ENDRET_PERMITTERINGSPROSENT tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.NY_JOBB) {
        return <NY_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.KONKURS) {
        return <KONKURS tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP tilleggsData={tilleggsData} />;
    } else {
        return <ANNET tilleggsData={tilleggsData} />;
    }
}

export default TilleggsData;
