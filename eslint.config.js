import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
    {
        files: ['src/**/*.[js|jsx|ts|tsx]'],
        extends: ['plugin:storybook/recommended'],
        ...reactRecommended,
    },
];
