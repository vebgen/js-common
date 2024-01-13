/* eslint-disable */
export default {
    displayName: 'debug',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|ts|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]s?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: '../../coverage/packages/debug',
};
