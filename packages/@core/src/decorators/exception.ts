import { setExceptionCatchClassMetadata } from '../utils/metadataUtils/exception';

import type { AbyssalException } from '../core/AbyssalException';

export function Catch(
  exceptionClass: typeof AbyssalException | TAny,
): ClassDecorator {
  return (target: TAny) => {
    setExceptionCatchClassMetadata({
      exceptionClass,
      exceptionHandler: target,
    });
  };
}
