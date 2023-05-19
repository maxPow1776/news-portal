module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended', 'plugin:storybook/recommended', 'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'maxpow1776-custom', 'unused-imports'],
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.tsx'],
    }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    // !
    'no-unused-vars': 'warn',
    // !
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    // !
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [2, {
      markupOnly: true,
      ignoreAttribute: [
        'data-testid', 'to', 'name', 'target', 'justify', 'align', 'direction', 'gap', 'role', 'as', 'border',
        'feature', 'color', 'variant', 'size', 'space'
      ],
    }],
    'max-len': [2, {
      code: 120,
      ignoreComments: true,
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'warn',
    'arrow-body-style': 'off', // !
    'unused-imports/no-unused-imports': 'error',
    'maxpow1776-custom/check-paths': ['error', { alias: '@' }],
    'maxpow1776-custom/layer-imports': ['error',
      { alias: '@', ignoreImportPatterns: ['**/StoreProvider', '**/testing'] }],
    'maxpow1776-custom/public-api-imports': ['error',
      { alias: '@', testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'] }],
    'react/jsx-max-props-per-line': ['error', { maximum: 5 }]
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [{
    files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
    rules: {
      'i18next/no-literal-string': 'off',
      'max-len': 'off',
    },
  }],
};
