module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'html'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/member-delimiter-style': 0,
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'never', { ignorePackages: true }],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'all', ignoreRestSiblings: false },
    ],
  },
}
