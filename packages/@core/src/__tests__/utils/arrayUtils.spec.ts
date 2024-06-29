import { describe, expect, it, suite } from 'vitest';

import { push } from '../../utils/arrayUtils';

describe('[utils]: arrayUtils', () => {
  suite('push', () => {
    suite('with array', () => {
      it('pushes item to array', () => {
        expect(push([], 1)).toStrictEqual([1]);
      });
    });

    suite('without array', () => {
      it('pushes item to array', () => {
        expect(push(undefined, 1)).toStrictEqual([1]);
      });
    });
  });
});
