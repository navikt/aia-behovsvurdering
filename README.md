# aia-behovsvurdering

Microfrontend for behovsvurdering, arbeidssøkers egen vurdering av behov for veiledning.

## Stroybook

[https://aia-behovsvurdering.ansatt.dev.nav.no/](https://aia-behovsvurdering.ansatt.dev.nav.no/)

# Utvikling

Bruk Node.js 22 `nvm use` (dersom du bruker nvm til versjonshåndtering av Node.js).

Siden noen av modulene hentes fra GitHubs package registry må du også gjøre litt ekstra konfigurasjon for å kjøre løsningen lokalt.

- Opprett et PAT (github => settings => developer settings => personal access tokens => tokens (classic)) med `read:packages` scope
- Konfigurer SSO mot NAVIKT for tokenet
- Bruk tokenet som passord ved login `npm login --registry https://npm.pkg.github.com`
- På roten av repoet lager du en `.npmrc` fil med dette innholdet

```
@navikt:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org
engine-strict=true
save-exact=true
```

Deretter fortsette du med

- klon repo
- bruk rett versjon av Node.js `nvm use`
- innstaller avhengigheter `npm i`
- kjør tester `npm t`
- start utviklingsserver med storybook `npm start`
- nettleseren vil da åpne seg på `http://localhost:6006/`

## Deploye kun til dev

Ved å prefikse branch-navn med `dev/`, så vil branchen kun deployes i dev.

```
git checkout -b dev/<navn på branch>
```

For å se løsningen i dev bruker du [https://www.ansatt.dev.nav.no/minside](https://www.ansatt.dev.nav.no/minside)

Du vil trenger en syntetisk testbruker for å logge inn.
Slike brukere kan du opprette på [Dolly](https://dolly.ekstern.dev.nav.no/)

## Ekstern dokumentasjon

- [Storybook](https://storybook.js.org/)
- [Aksel - komponenter](https://aksel.nav.no/komponenter)
- [Tailwind.css](https://tailwindcss.com/)

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-paw-dev](https://nav-it.slack.com/archives/CLTFAEW75)
