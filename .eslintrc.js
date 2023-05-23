/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
  ],
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28,
    },
  },
  rules: {
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
  },
  overrides: [
    {
      files: ['bin/*.js', 'lib/*.js'],
      excludedFiles: '*.test.js',
      rules: {
        'no-unused-vars': [
          'error',
          { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
      },
    },
  ],
};
