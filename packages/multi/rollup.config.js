import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const { preprocess } = require('./svelte.config');

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'runtime/index.ts',
  inlineDynamicImports: true,
  output: {
    sourcemap: true,
    format: 'cjs',
    name: 'multi',
    dir: 'dist',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      compilerOptions: {
        dev: !production,
      },
      preprocess,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production &&
      terser({
        module: true,
      }),
  ],
};
