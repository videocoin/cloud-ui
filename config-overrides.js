/* eslint-disable */
const path = require('path');
const { useEslintRc, addWebpackAlias, override, fixBabelImports } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  fixBabelImports('lodash'),
  addWebpackAlias({
    react: path.resolve('./node_modules/react')
  })
);
