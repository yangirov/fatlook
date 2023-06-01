/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = await getDefaultConfig();

    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-sass-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            sourceExts: [...sourceExts, 'scss', 'sass'],
        },
        watchFolders: [path.resolve(__dirname, './src'), path.resolve(__dirname, '../core')],
        projectRoot: path.resolve(__dirname),
    };
})();
