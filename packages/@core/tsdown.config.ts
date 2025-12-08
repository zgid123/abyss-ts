import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  entry: ['src/index.ts'],
});
