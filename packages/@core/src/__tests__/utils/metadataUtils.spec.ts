import { describe, expect, it, suite } from 'vitest';

import { ACTIONS, CONTROLLER, PARAMS } from '../../constants/metadata';
import {
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
});
