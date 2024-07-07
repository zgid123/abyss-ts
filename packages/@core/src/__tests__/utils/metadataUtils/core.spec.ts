import { describe, expect, it, suite } from 'vitest';

import {
  setMetadata,
  getMetadata,
  deleteMetadata,
} from '../../../utils/metadataUtils';

describe('[utils]: metadataUtils - core', () => {
  suite('setMetadata', () => {
    suite('without propertyKey', () => {
      it('sets metadata for MyService class', () => {
        class MyService {}

        setMetadata({
          key: 'test',
          target: MyService,
          value: 'test_value',
        });

        expect(Reflect.getMetadata('test', MyService)).toBe('test_value');
      });
    });

    suite('with propertyKey', () => {
      it('sets metadata for MyService class', () => {
        class MyService {}

        setMetadata({
          key: 'test',
          target: MyService,
          value: 'test_value',
          propertyKey: 'constructor',
        });

        expect(Reflect.getMetadata('test', MyService, 'constructor')).toBe(
          'test_value',
        );
      });
    });
  });

  suite('getMetadata', () => {
    suite('without propertyKey', () => {
      it('gets metadata from MyService class', () => {
        class MyService {}

        Reflect.defineMetadata('test', 'test_value', MyService);

        expect(
          getMetadata({
            key: 'test',
            target: MyService,
          }),
        ).toBe('test_value');
      });
    });

    suite('with propertyKey', () => {
      it('gets metadata from MyService class', () => {
        class MyService {}

        Reflect.defineMetadata('test', 'test_value', MyService, 'constructor');

        expect(
          getMetadata({
            key: 'test',
            target: MyService,
            propertyKey: 'constructor',
          }),
        ).toBe('test_value');
      });
    });
  });

  suite('deleteMetadata', () => {
    it('deletes metadata for MyService class', () => {
      class MyService {}

      Reflect.defineMetadata('test', 'test_value', MyService);

      deleteMetadata({
        key: 'test',
        target: MyService,
      });

      expect(Reflect.getMetadata('test', MyService)).toBe(undefined);
    });
  });
});
