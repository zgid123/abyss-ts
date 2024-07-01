import {
  setInjectionMetadata,
  setInjectParamMetadata,
} from '../utils/metadataUtils';

import type { TInjectionScopes } from '../constants/injection';

interface IInjectableParams {
  scope?: TInjectionScopes;
}

export function Injectable({
  scope = 'singleton',
}: IInjectableParams = {}): ClassDecorator {
  return (target: TAny) => {
    setInjectionMetadata({
      scope,
      target,
    });
  };
}

export function Inject(injectable: TAny): ParameterDecorator {
  return (
    target: TAny,
    _propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    setInjectParamMetadata({
      target,
      parameterIndex,
      extractor: injectable,
    });
  };
}
