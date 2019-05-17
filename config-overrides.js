/* eslint-disable */
const path = require('path');
const { useEslintRc, addWebpackAlias, override, addBabelPlugin, fixBabelImports } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  fixBabelImports('lodash'),
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    react: path.resolve('./node_modules/react'),
    'react-dom': '@hot-loader/react-dom',
  })
);
