import { configVitest } from '@abyss.ts/internal-vitest';

import type { UserConfigExport } from 'vitest/config';

export default async function config(): Promise<UserConfigExport> {
  return configVitest({
    root: __dirname,
  });
}
