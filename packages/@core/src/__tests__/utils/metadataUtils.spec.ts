import { afterEach, describe, expect, it, suite } from 'vitest';

import { IoC } from '../../core/IoC';
import {
  PARAMS,
  ACTIONS,
  CONTROLLER,
  INJECTABLE,
  IOC_CONTAINER,
} from '../../constants/metadata';
import {
  pushToIoCContainer,
  getFromIoCContainer,
  getInjectionMetadata,
  setInjectionMetadata,
  getControllerMetadata,
  setControllerMetadata,
  getActionParamMetadata,
  setActionParamMetadata,
  getControllerActionMetadata,
  setControllerActionMetadata,
} from '../../utils/metadataUtils';

describe('[utils]: metadataUtils', () => {
  suite('setControllerMetadata', () => {
    it('sets metadata for MyController class', () => {
      class MyController {}

      setControllerMetadata({
        route: '/test',
        controller: MyController,
      });

      expect(Reflect.getMetadata(CONTROLLER, MyController)).toStrictEqual({
        route: 'test',
        type: 'controller',
      });
    });
  });

  suite('getControllerMetadata', () => {
    suite('set before use', () => {
      it('gets metadata from MyController class', () => {
        class MyController {}

        Reflect.defineMetadata(
          CONTROLLER,
          {
            type: 'controller',
            route: 'test',
          },
          MyController,
        );

        expect(getControllerMetadata(MyController)).toStrictEqual({
          route: 'test',
          type: 'controller',
        });
      });
    });

    suite('use without being set', () => {
      it('gets {}', () => {
        class MyController {}

        expect(getControllerMetadata(MyController)).toStrictEqual({});
      });
    });
  });

  suite('setControllerActionMetadata', () => {
    it('sets metadata for MyController class', () => {
      class MyController {
        index(): string {
          return 'Test';
        }
      }

      setControllerActionMetadata({
        route: '/test',
        httpMethod: 'get',
        propertyKey: 'index',
        controller: MyController,
        exec: MyController.prototype.index,
      });

      expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
        {
          route: 'test',
          type: 'action',
          httpMethod: 'get',
          propertyKey: 'index',
          exec: MyController.prototype.index,
        },
      ]);
    });
  });

  suite('getControllerActionMetadata', () => {
    suite('set before use', () => {
      it('gets metadata from MyController class', () => {
        class MyController {
          index(): string {
            return 'Test';
          }
        }

        Reflect.defineMetadata(
          ACTIONS,
          [
            {
              route: 'test',
              type: 'action',
              httpMethod: 'get',
              propertyKey: 'index',
              exec: MyController.prototype.index,
            },
          ],
          MyController,
        );

        expect(getControllerActionMetadata(MyController)).toStrictEqual([
          {
            route: 'test',
            type: 'action',
            httpMethod: 'get',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('use without being set', () => {
      it('gets []', () => {
        class MyController {
          index(): string {
            return 'Test';
          }
        }

        expect(getControllerActionMetadata(MyController)).toStrictEqual([]);
      });
    });
  });

  suite('setActionParamMetadata', () => {
    it('sets metadata for MyController class', () => {
      class MyController {
        index(): string {
          return 'Test';
        }
      }

      setActionParamMetadata({
        type: 'query',
        extractor: 'test',
        parameterIndex: 0,
        propertyKey: 'index',
        controller: MyController,
      });

      expect(Reflect.getMetadata(PARAMS, MyController, 'index')).toStrictEqual([
        {
          type: 'query',
          extractor: 'test',
        },
      ]);
    });
  });

  suite('getActionParamMetadata', () => {
    suite('set before use', () => {
      it('gets metadata from MyController class', () => {
        class MyController {
          index(): string {
            return 'Test';
          }
        }

        Reflect.defineMetadata(
          PARAMS,
          [
            {
              type: 'query',
              extractor: 'test',
            },
          ],
          MyController,
          'index',
        );

        expect(
          getActionParamMetadata({
            propertyKey: 'index',
            controller: MyController,
          }),
        ).toStrictEqual([
          {
            type: 'query',
            extractor: 'test',
          },
        ]);
      });
    });

    suite('use without being set', () => {
      it('gets []', () => {
        class MyController {
          index(): string {
            return 'Test';
          }
        }

        expect(
          getActionParamMetadata({
            propertyKey: 'index',
            controller: MyController,
          }),
        ).toStrictEqual([]);
      });
    });
  });

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
