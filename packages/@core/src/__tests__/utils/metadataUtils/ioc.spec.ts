import { describe, expect, it, suite } from 'vitest';

import { IOC_CONTAINER } from '../../../constants/metadata';
import {
  pushToIoCContainer,
  getFromIoCContainer,
} from '../../../utils/metadataUtils';

describe('[utils]: metadataUtils - ioc', () => {
  suite('pushToIoCContainer', () => {
    it('sets metadata for MyService class', () => {
      class MyService {
        index(): string {
          return 'Test';
        }
      }

      const instance = new MyService();

      pushToIoCContainer({
        instance,
        target: MyService,
      });

      expect(Reflect.getMetadata(IOC_CONTAINER, MyService)).toStrictEqual(
        instance,
      );
    });
  });

  suite('getFromIoCContainer', () => {
    it('gets metadata from MyService class', () => {
      class MyService {
        index(): string {
          return 'Test';
        }
      }

      const instance = new MyService();

      Reflect.defineMetadata(IOC_CONTAINER, instance, MyService);

      expect(getFromIoCContainer(MyService)).toStrictEqual(instance);
    });
  });
});
