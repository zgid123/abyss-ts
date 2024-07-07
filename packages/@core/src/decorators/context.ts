import { setActionParamMetadata } from '../utils/metadataUtils';

export function Context(): ParameterDecorator {
  return (
    target: TAny,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    if (!propertyKey) {
      throw new Error(
        "Context must be used inside parameter of controller's action",
      );
    }

    setActionParamMetadata({
      propertyKey,
      parameterIndex,
      type: 'context',
      controller: target.constructor,
    });
  };
}
