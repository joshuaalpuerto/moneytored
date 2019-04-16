const fs = require('fs')

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'))

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],

  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'never'],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    // indent: [
    //   2,
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,

    'no-underscore-dangle': [
      0,
      { allow: ['foo_', '_bar'], allowAfterThis: true, allowAfterSuper: true }
    ],
    'no-param-reassign': [0, {}],
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
    'no-shadow': 'off',
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-unused-prop-types': 1,
    'react/no-unused-state': 0,
    'react/no-did-mount-set-state': 0,
    'object-shorthand': 0,
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-return-assign': 0,
    'no-restricted-globals': 0,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'prefer-destructuring': ['error', { object: false, array: false }],
    'no-restricted-syntax': 0,
    'no-prototype-builtins': 0
  }
}
