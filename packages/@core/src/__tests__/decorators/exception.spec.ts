import { describe, expect, it } from 'vitest';

import { Catch } from '../../decorators/exception';
import { AbyssalException } from '../../core/AbyssalException';
import { EXCEPTION_HANDLER_CATCH_CLASS } from '../../constants/metadata';

describe('[decorators]: exception', () => {
  it('sets metadata for MyController class', () => {
    class Exception extends AbyssalException {}

    @Catch(Exception)
    class MyController {}

    expect(
      Reflect.getMetadata(EXCEPTION_HANDLER_CATCH_CLASS, MyController),
    ).toEqual(Exception);
  });
});
