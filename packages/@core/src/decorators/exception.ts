import type { AbyssalException } from '../core/AbyssalException';
import { setExceptionCatchClassMetadata } from '../utils/metadataUtils/exception';

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
