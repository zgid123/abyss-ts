import { describe, expect, it, suite } from 'vitest';

import { ACTIONS } from '../../constants/metadata';
import { Delete, Get, Patch, Post, Put } from '../../decorators/httpMethods';

describe('[decorators]: httpMethods', () => {
  suite('Get', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Get()
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: '',
            type: 'action',
            httpMethod: 'get',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Get('/test')
          index(): string {
            return 'Test';
          }
        }

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
  });

  suite('Post', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Post()
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: '',
            type: 'action',
            httpMethod: 'post',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Post('/test')
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: 'test',
            type: 'action',
            httpMethod: 'post',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });
  });

  suite('Put', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Put()
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: '',
            type: 'action',
            httpMethod: 'put',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Put('/test')
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: 'test',
            type: 'action',
            httpMethod: 'put',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });
  });

  suite('Patch', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Patch()
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: '',
            type: 'action',
            httpMethod: 'patch',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Patch('/test')
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: 'test',
            type: 'action',
            httpMethod: 'patch',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });
  });

  suite('Delete', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Delete()
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: '',
            type: 'action',
            httpMethod: 'delete',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index", () => {
        class MyController {
          @Delete('/test')
          index(): string {
            return 'Test';
          }
        }

        expect(Reflect.getMetadata(ACTIONS, MyController)).toStrictEqual([
          {
            route: 'test',
            type: 'action',
            httpMethod: 'delete',
            propertyKey: 'index',
            exec: MyController.prototype.index,
          },
        ]);
      });
    });
  });
});
