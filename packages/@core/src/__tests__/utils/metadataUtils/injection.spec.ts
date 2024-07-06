import { afterEach, describe, expect, it, suite } from 'vitest';

import { IoC } from '../../../core/IoC';
import { INJECT, INJECTABLE } from '../../../constants/metadata';
import {
  setInjectionMetadata,
  getInjectionMetadata,
  setInjectParamMetadata,
  getInjectParamMetadata,
} from '../../../utils/metadataUtils';

describe('[utils]: metadataUtils - injection', () => {
  suite('setInjectionMetadata', () => {
    it('sets metadata for MyController class', () => {
      class MyController {
        index(): string {
          return 'Test';
        }
      }

      setInjectionMetadata({
        scope: 'singleton',
        target: MyController,
      });

      expect(Reflect.getMetadata(INJECTABLE, IoC)).toStrictEqual([
        {
          scope: 'singleton',
          target: MyController,
        },
      ]);
    });
  });

  suite('getInjectionMetadata', () => {
    afterEach(() => {
      Reflect.deleteMetadata(INJECTABLE, IoC);
    });

    suite('set before use', () => {
      it('gets metadata from MyController class', () => {
        class MyController {
          index(): string {
            return 'Test';
          }
        }

        Reflect.defineMetadata(
          INJECTABLE,
          [
            {
              scope: 'singleton',
              target: MyController,
            },
          ],
          IoC,
        );

        expect(getInjectionMetadata()).toStrictEqual([
          {
            scope: 'singleton',
            target: MyController,
          },
        ]);
      });
    });

    suite('use without being set', () => {
      it('gets []', () => {
        expect(getInjectionMetadata()).toStrictEqual([]);
      });
    });
  });

  suite('setInjectParamMetadata', () => {
    it('sets metadata for MyService class', () => {
      class MyService {}

      setInjectParamMetadata({
        target: MyService,
        parameterIndex: 0,
        extractor: 'extractor',
      });

      expect(
        Reflect.getMetadata(INJECT, MyService, 'constructor'),
      ).toStrictEqual([
        {
          extractor: 'extractor',
        },
      ]);
    });
  });

  suite('getInjectParamMetadata', () => {
    suite('set before use', () => {
      it('gets metadata from MyService class', () => {
        class MyService {}

        Reflect.defineMetadata(
          INJECT,
          [
            {
              extractor: 'extractor',
            },
          ],
          MyService,
          'constructor',
        );

        expect(
          getInjectParamMetadata({
            target: MyService,
          }),
        ).toStrictEqual([
          {
            extractor: 'extractor',
          },
        ]);
      });
    });

    suite('use without being set', () => {
      it('gets []', () => {
        class MyService {}

        expect(
          getInjectParamMetadata({
            target: MyService,
          }),
        ).toStrictEqual([]);
      });
    });
  });
});
