module.exports = {
  extends: ['airbnb'],
  ignorePatterns: ['dist', '*.json'],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'import/first': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-plusplus': 'off',
    'no-undef-init': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
    {
      files: ['**/*.js'],
      rules: { 'import/no-extraneous-dependencies': 'off' },
    },
  ],
};
