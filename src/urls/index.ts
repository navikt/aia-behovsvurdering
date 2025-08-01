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
    local: '/aia-backend',
    development: 'https://www.ansatt.dev.nav.no/aia-backend',
    production: 'https://www.nav.no/aia-backend',
};

export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
