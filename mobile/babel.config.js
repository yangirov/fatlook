module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-classname-to-style',
        [
            'react-native-platform-specific-extensions',
            {
                extensions: ['scss', 'sass'],
            },
        ],
        [
            'module-resolver',
            {
                extensions: ['.ts', '.tsx', '.js'],
                root: ['../'],
                alias: {
                    '@/core': '../core',
                    '@/mobile': './src',
                },
            },
        ],
        [
            'module:react-native-dotenv',
            {
                envName: 'APP_ENV',
                moduleName: '@env',
                path: '.env',
            },
        ],
    ],
    env: {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    },
};
