const {getDefaultConfig} = require('metro-config');

const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

/** @typedef {ReturnType<import('metro-config/src/defaults/index.js')['getDefaultValues']>} MetroConfig */
/** @typedef {Partial<{[K in keyof MetroConfig]: Partial<MetroConfig[K]>}>} PartialMetroConfig */

module.exports = (async () => {
  /** @type {MetroConfig} */
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  /** @type {PartialMetroConfig} */
  const config = {
    projectRoot: __dirname,
    watchFolders: [root],
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      blacklistRE: blacklist(
        modules.map(
          m =>
            new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
        ),
      ),

      extraNodeModules: modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
    },
  };
  return config;
})();
