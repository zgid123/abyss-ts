import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  splitting: false,
  external: ['vitest'],
  entry: ['src/index.ts'],
});
