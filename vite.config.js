import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { rollupImportMapPlugin } from 'rollup-plugin-import-map';
import terser from '@rollup/plugin-terser';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const getPlugins = () => {
    return [
        svgr(),
        react(),
        terser(),
        cssInjectedByJsPlugin(),
        {
            ...rollupImportMapPlugin([
                {
                    imports: {
                        react: 'https://www.nav.no/tms-min-side-assets/react/18/esm/index.js',
                        'react-dom': 'https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js',
                    },
                },
            ]),
            enforce: 'pre',
            apply: 'build',
        },
    ];
};

const getConfig = () => ({
    plugins: getPlugins(),
    server: {
        port: 3002,
    },
});

const getCdnConfig = () => ({
    plugins: getPlugins(),
    build: {
        rollupOptions: {
            input: {
                aia: resolve(__dirname, 'src/Mikrofrontend.tsx'),
            },
            preserveEntrySignatures: 'exports-only',
            output: {
                entryFileNames: 'aia-behovsvurdering.[hash].js',
                format: 'esm',
            },
        },
    },
});

export default defineConfig(({ mode }) => {
    if (mode === 'cdn') {
        return getCdnConfig();
    }
    return getConfig();
});
