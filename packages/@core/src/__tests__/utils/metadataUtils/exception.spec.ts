import { describe, expect, it, suite } from 'vitest';

import { AbyssalException } from '../../../core/AbyssalException';
import { EXCEPTION_HANDLER_CATCH_CLASS } from '../../../constants/metadata';
import {
  getExceptionCatchClassMetadata,
  setExceptionCatchClassMetadata,
} from '../../../utils/metadataUtils';

describe('[utils]: metadataUtils - exception', () => {
  suite('setExceptionCatchClassMetadata', () => {
    it('sets metadata for MyController class', () => {
      class Exception extends AbyssalException {}
      class MyController {}

      setExceptionCatchClassMetadata({
        exceptionClass: Exception,
        exceptionHandler: MyController,
      });

      expect(
        Reflect.getMetadata(EXCEPTION_HANDLER_CATCH_CLASS, MyController),
      ).toEqual(Exception);
    });
  });

  suite('getExceptionCatchClassMetadata', () => {
    it('gets metadata from MyController class', () => {
      class Exception extends AbyssalException {}
      class MyController {}

      Reflect.defineMetadata(
        EXCEPTION_HANDLER_CATCH_CLASS,
        Exception,
        MyController,
      );

      expect(getExceptionCatchClassMetadata(MyController)).toEqual(Exception);
    });
  });
});
