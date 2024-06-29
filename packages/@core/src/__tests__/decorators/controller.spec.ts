import { describe, expect, it, suite } from 'vitest';

import { CONTROLLER } from '../../constants/metadata';
import { Controller } from '../../decorators/controller';

describe('[decorators]: controller', () => {
  suite('Controller', () => {
    suite('no param', () => {
      it('sets metadata for MyController class', () => {
        @Controller()
        class MyController {}

        expect(Reflect.getMetadata(CONTROLLER, MyController)).toStrictEqual({
          route: '',
          type: 'controller',
        });
      });
    });

    suite('with route param', () => {
      it('sets metadata for MyController class', () => {
        @Controller('/test')
        class MyController {}

        expect(Reflect.getMetadata(CONTROLLER, MyController)).toStrictEqual({
          route: 'test',
          type: 'controller',
        });
      });
    });
  });
});
