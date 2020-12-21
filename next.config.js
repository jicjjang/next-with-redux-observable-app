const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withSass = require('@zeit/next-sass');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {};

module.exports = withPlugins(
  [
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]'
        }
      }
    ],
    [
      withBundleAnalyzer({
        // enabled: !isProduction
        enabled: false
      })
    ]
  ],
  Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      return Object.assign({}, config, {
        mode: isProduction ? 'production' : config.mode,
        devtool: isProduction ? 'hidden-source-map' : config.devtool
      });
    }
  })
);
