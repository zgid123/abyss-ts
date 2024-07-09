import { describe, expect, it, suite } from 'vitest';

import { IoC } from '../../../core/IoC';
import { INJECTABLE_IDENTITY } from '../../../constants/metadata';
import {
  pushToIoCContainer,
  getFromIoCContainer,
  getInjectableIdentity,
} from '../../../utils/metadataUtils';

describe('[utils]: metadataUtils - ioc', () => {
  suite('getInjectableIdentity', () => {
    it('gets symbol identity for MyService class', () => {
      class MyService {}

      const key = Symbol(MyService.name);
      Reflect.defineMetadata(INJECTABLE_IDENTITY, key, MyService);

      expect(getInjectableIdentity(MyService)).toBe(key);
    });
  });

  suite('pushToIoCContainer', () => {
    suite('without key param', () => {
      suite('set identity metadata before pushing', () => {
        it('register MyService class to IoC with the identity', () => {
          class MyService {}

          const instance = new MyService();
          const key = Symbol(MyService.name);
          Reflect.defineMetadata(INJECTABLE_IDENTITY, key, MyService);

          pushToIoCContainer({
            instance,
            target: MyService,
          });

          expect(Reflect.getMetadata(key, IoC)).toStrictEqual(instance);
        });
      });

      suite('no identity metadata before pushing', () => {
        it('register MyService class to IoC with general identity', () => {
          class MyService {}

          const instance = new MyService();

          pushToIoCContainer({
            instance,
            target: MyService,
          });

          expect(
            Reflect.getMetadata(Symbol.for(MyService.name), IoC),
          ).toStrictEqual(instance);
        });
      });
    });

    suite('with key param', () => {
      it('register MyService class to IoC with the key param', () => {
        class MyService {}

        const instance = new MyService();

        pushToIoCContainer({
          instance,
          key: '__test__',
          target: MyService,
        });

        expect(Reflect.getMetadata('__test__', IoC)).toStrictEqual(instance);
      });
    });
  });

  suite('getFromIoCContainer', () => {
    suite('with symbol param', () => {
      it('gets MyService class instance from IoC with key', () => {
        class MyService {}

        const instance = new MyService();
        Reflect.defineMetadata(Symbol.for(MyService.name), instance, IoC);

        expect(getFromIoCContainer(Symbol.for(MyService.name))).toStrictEqual(
          instance,
        );
      });
    });

    suite('with string param', () => {
      it('gets MyService class instance from IoC with key', () => {
        class MyService {}

        const instance = new MyService();
        Reflect.defineMetadata(MyService.name, instance, IoC);

        expect(getFromIoCContainer(MyService.name)).toStrictEqual(instance);
      });
    });

    suite('with class param', () => {
      it('gets MyService class instance from IoC with class itself', () => {
        class MyService {}

        const instance = new MyService();
        Reflect.defineMetadata(MyService.name, instance, IoC);
        Reflect.defineMetadata(INJECTABLE_IDENTITY, MyService.name, MyService);

        expect(getFromIoCContainer(MyService)).toStrictEqual(instance);
      });
    });
  });
});
