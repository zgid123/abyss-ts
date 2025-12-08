import { describe, expect, it } from 'vitest';

import { EXCEPTION_HANDLER_CATCH_CLASS } from '../../constants/metadata';
import { AbyssalException } from '../../core/AbyssalException';
import { Catch } from '../../decorators/exception';

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
