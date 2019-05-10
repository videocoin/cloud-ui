/* eslint-disable */
const { addWebpackAlias, override, addBabelPlugin, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('lodash'),
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom'
  })
);
