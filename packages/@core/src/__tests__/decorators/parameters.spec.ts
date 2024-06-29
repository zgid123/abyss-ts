import { describe, expect, it, suite } from 'vitest';

import { PARAMS } from '../../constants/metadata';
import { Body, Param, Query, Request } from '../../decorators/parameters';

describe('[decorators]: parameters', () => {
  suite('Query', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Query() _query: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'query',
            extractor: undefined,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Query('test') _query: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'query',
            extractor: 'test',
          },
        ]);
      });
    });

    suite('more than one params', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(
            @Query('test') _query: string,
            @Query('test2') _query2: string,
          ) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'query',
            extractor: 'test',
          },
          {
            type: 'query',
            extractor: 'test2',
          },
        ]);
      });
    });
  });

  suite('Body', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Body() _body: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'body',
            extractor: undefined,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Body('test') _body: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'body',
            extractor: 'test',
          },
        ]);
      });
    });

    suite('more than one params', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Body('test') _body: string, @Body('test2') _body2: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'body',
            extractor: 'test',
          },
          {
            type: 'body',
            extractor: 'test2',
          },
        ]);
      });
    });
  });

  suite('Param', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Param() _param: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'param',
            extractor: undefined,
          },
        ]);
      });
    });

    suite('with route param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Param('test') _param: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'param',
            extractor: 'test',
          },
        ]);
      });
    });

    suite('more than one params', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(
            @Param('test') _param: string,
            @Param('test2') _param2: string,
          ) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'param',
            extractor: 'test',
          },
          {
            type: 'param',
            extractor: 'test2',
          },
        ]);
      });
    });
  });

  suite('Request', () => {
    suite('no param', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Request() _request: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'request',
            extractor: undefined,
          },
        ]);
      });
    });

    suite('more than one params', () => {
      it("sets metadata for MyController class's index's param", () => {
        class MyController {
          index(@Request() _request: string, @Request() _request2: string) {
            return 'Test';
          }
        }

        expect(
          Reflect.getMetadata(PARAMS, MyController, 'index'),
        ).toStrictEqual([
          {
            type: 'request',
            extractor: undefined,
          },
          {
            type: 'request',
            extractor: undefined,
          },
        ]);
      });
    });
  });
});
