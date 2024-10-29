const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['db', 'mp4', 'jpg', 'jpeg', 'png', 'ttf', 'wav', 'mp3', 'svg'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs'],
  },
  watchFolders: [
    // Add any folders you want to watch here
  ],
  // Use a different file watcher
  watch: {
    usePolling: true,
    interval: 1000,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
