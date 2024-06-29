import { describe, expect, it, suite } from 'vitest';

import { combine } from '../../utils/stringUtils';

describe('[utils]: stringUtils', () => {
  suite('combine', () => {
    suite('without joinWith option', () => {
      it('combines two strings with space', () => {
        expect(combine('test', '2')).toBe('test 2');
      });
    });

    suite('with joinWith option', () => {
      it('combines two strings with joinWith value', () => {
        expect(combine({ joinWith: '/' }, 'test', '2')).toBe('test/2');
      });
    });

    suite('with undefined value', () => {
      it('excludes undefined value', () => {
        expect(combine({ joinWith: '/' }, undefined, 'test', '2')).toBe(
          'test/2',
        );
      });
    });

    suite('with empty value', () => {
      it('excludes empty value', () => {
        expect(combine({ joinWith: '/' }, '', 'test', '2')).toBe('test/2');
      });
    });
  });
});
