import { describe, expect, it, suite } from 'vitest';

import { loadControllers } from '../../utils/controllerUtils';

describe('[utils]: controllerUtils', () => {
  suite('loadControllers', () => {
    it('loads all files with affix Controller.ts or .controller.ts', async () => {
      const controllers = (await loadControllers()).flatMap((e) =>
        Object.keys(e),
      );

      expect(controllers).toContain('AController');
      expect(controllers).toContain('BController');
    });
  });
});
