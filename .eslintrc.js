const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:lodash-fp/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    "project": "./tsconfig.json",
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'import', 'lodash-fp'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "react/prop-types": "off",
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".jsx", ".tsx"]
    }],
    "no-param-reassign": [2, { "props": false }]
  },
  settings: {
    'import/resolver': {
      "typescript": {},
      alias: {
        map: [
          ['kit', path.join(__dirname, 'src', 'ui-kit', 'dist')],
        ],
        extensions: ['ts', '.tsx'],
      },
    }
  }
};
