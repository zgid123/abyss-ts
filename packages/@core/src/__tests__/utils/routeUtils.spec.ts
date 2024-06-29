import { describe, expect, it, suite } from 'vitest';

import { sanitize } from '../../utils/routeUtils';

describe('[utils]: routeUtils', () => {
  suite('sanitize', () => {
    suite('start with slash', () => {
      it('removes start slash', () => {
        expect(sanitize('/test/test')).toBe('test/test');
      });
    });

    suite('end with slash', () => {
      it('removes end slash', () => {
        expect(sanitize('test/test/')).toBe('test/test');
      });
    });

    suite('start and end with slash', () => {
      it('removes start and end slash', () => {
        expect(sanitize('/test/test/')).toBe('test/test');
      });
    });
  });
});
