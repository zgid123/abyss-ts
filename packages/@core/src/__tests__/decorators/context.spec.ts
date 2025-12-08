import { describe, expect, it, suite } from 'vitest';

import { PARAMS } from '../../constants/metadata';
import type { AbyssalContext } from '../../core/AbyssalContext';
import { Context } from '../../decorators/context';

describe('[decorators]: context', () => {
  suite('Context', () => {
    it('sets metadata for MyController class', () => {
      class MyController {
        index(@Context() _context: AbyssalContext) {
          return 'Test';
        }
      }

      expect(Reflect.getMetadata(PARAMS, MyController, 'index')).toStrictEqual([
        {
          type: 'context',
          extractor: undefined,
        },
      ]);
    });
  });
});
