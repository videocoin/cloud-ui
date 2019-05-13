/* eslint-disable */
const { useEslintRc, override, fixBabelImports } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  fixBabelImports('lodash'),
);
