import { getMetadata, setMetadata } from './core';
import { EXCEPTION_HANDLER_CATCH_CLASS } from '../../constants/metadata';

import type { AbyssalException } from '../../core/AbyssalException';

interface ISetExceptionCatchClassMetadataParams {
  exceptionHandler: TAny;
  exceptionClass: typeof AbyssalException;
}

export function setExceptionCatchClassMetadata({
  exceptionClass,
  exceptionHandler,
}: ISetExceptionCatchClassMetadataParams): void {
  setMetadata({
    value: exceptionClass,
    target: exceptionHandler,
    key: EXCEPTION_HANDLER_CATCH_CLASS,
  });
}

export function getExceptionCatchClassMetadata(
  exceptionHandler: TAny,
): typeof AbyssalException {
  return getMetadata<typeof AbyssalException>({
    target: exceptionHandler,
    key: EXCEPTION_HANDLER_CATCH_CLASS,
  });
}
