module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'module:react-native-dotenv',
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
    ],
    env: {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    },
};
