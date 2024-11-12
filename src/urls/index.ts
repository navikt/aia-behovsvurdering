const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('.dev.nav.no');

export const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }

    if (isDevelopment) {
        return 'development';
    }

    return 'local';
};

const AIA_BACKEND_URL = {
    local: 'http://localhost:3000/aia-backend',
    development: 'https://www.ansatt.dev.nav.no/aia-backend',
    production: 'https://www.nav.no/aia-backend',
};

const START_SAMTALE_URL = {
    local: 'https://pto.ekstern.dev.nav.no/arbeid/start-samtale',
    development: 'https://pto.ekstern.dev.nav.no/arbeid/start-samtale',
    production: 'https://nav.no/arbeid/start-samtale',
};

export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
export const motestotteLenke = START_SAMTALE_URL[getEnvironment()];
