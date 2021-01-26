const eslintSveltePreprocess = require('eslint-svelte3-preprocess');

const base = require('../../.eslintrc');
const { preprocess } = require('./svelte.config');

module.exports = {
  extends: '../../.eslintrc',
  plugins: ['svelte3', 'react'],
  overrides: [
    ...base.overrides,
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/preprocess': eslintSveltePreprocess(preprocess),
    react: {
      version: '16.13',
    },
  },
};
