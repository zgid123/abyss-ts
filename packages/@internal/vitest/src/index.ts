import { resolve } from 'path';
import { defineConfig, type UserConfigExport } from 'vitest/config';

import type { InlineConfig } from 'vitest';

interface IConfigVitestParams {
  root: string;
  server?: InlineConfig['server'];
}

export function configVitest({
  root,
  server,
}: IConfigVitestParams): UserConfigExport {
  return defineConfig({
    test: {
      server,
      root: './src',
      globals: true,
      include: ['__tests__/**/*.spec.ts'],
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
      },
    },
    resolve: {
      alias: [
        {
          find: '~',
          replacement: resolve(root, 'src'),
        },
      ],
    },
  });
}
