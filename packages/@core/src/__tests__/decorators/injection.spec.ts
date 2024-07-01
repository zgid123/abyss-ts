import { describe, expect, it, suite, afterEach } from 'vitest';

import { IoC } from '../../core/IoC';
import { INJECT, INJECTABLE } from '../../constants/metadata';
import { Inject, Injectable } from '../../decorators/injection';

describe('[decorators]: injection', () => {
  suite('Injectable', () => {
    afterEach(() => {
      Reflect.deleteMetadata(INJECTABLE, IoC);
    });

    suite('without scope', () => {
      it('sets metadata for MyService class', () => {
        @Injectable()
        class MyService {}

        expect(Reflect.getMetadata(INJECTABLE, IoC)).toStrictEqual([
          {
            scope: 'singleton',
            target: MyService,
          },
        ]);
      });
    });

    suite('with scope scoped', () => {
      it('sets metadata for MyService class', () => {
        @Injectable({
          scope: 'scoped',
        })
        class MyService {}

        expect(Reflect.getMetadata(INJECTABLE, IoC)).toStrictEqual([
          {
            scope: 'scoped',
            target: MyService,
          },
        ]);
      });
    });

    suite('with scope singleton', () => {
      it('sets metadata for MyService class', () => {
        @Injectable({
          scope: 'singleton',
        })
        class MyService {}

        expect(Reflect.getMetadata(INJECTABLE, IoC)).toStrictEqual([
          {
            scope: 'singleton',
            target: MyService,
          },
        ]);
      });
    });

    suite('with scope transient', () => {
      it('sets metadata for MyService class', () => {
        @Injectable({
          scope: 'transient',
        })
        class MyService {}

        expect(Reflect.getMetadata(INJECTABLE, IoC)).toStrictEqual([
          {
            scope: 'transient',
            target: MyService,
          },
        ]);
      });
    });
  });

  suite('Inject', () => {
    class InjectService {}

    class AnotherInjectService {}

    suite('with one param', () => {
      it("sets metadata for MyService class's constructor", () => {
        class MyService {
          constructor(
            @Inject(InjectService)
            // biome-ignore lint/correctness/noUnusedPrivateClassMembers: <explanation>
            private readonly injectService: InjectService,
          ) {}
        }

        expect(
          Reflect.getMetadata(INJECT, MyService, 'constructor'),
        ).toStrictEqual([
          {
            extractor: InjectService,
          },
        ]);
      });
    });

    suite('with two params', () => {
      it("sets metadata for MyService class's constructor", () => {
        class MyService {
          constructor(
            @Inject(InjectService)
            // biome-ignore lint/correctness/noUnusedPrivateClassMembers: <explanation>
            private readonly injectService: InjectService,
            @Inject(AnotherInjectService)
            // biome-ignore lint/correctness/noUnusedPrivateClassMembers: <explanation>
            private readonly anotherInjectService: AnotherInjectService,
          ) {}
        }

        expect(
          Reflect.getMetadata(INJECT, MyService, 'constructor'),
        ).toStrictEqual([
          {
            extractor: InjectService,
          },
          {
            extractor: AnotherInjectService,
          },
        ]);
      });
    });
  });
});
