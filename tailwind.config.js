/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    presets: [require('@navikt/ds-tailwind')],
};
