import { describe, expect, it, suite } from 'vitest';

import { ValidController } from '../AController';
import { loadControllers, mapControllers } from '../../utils/controllerUtils';

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

  suite('mapControllers', () => {
    it('gets all classes with Controller annotation', async () => {
      const controllers = await mapControllers();

      expect(controllers).toHaveLength(1);
      expect(controllers[0]).toBe(ValidController);
    });
  });
});
