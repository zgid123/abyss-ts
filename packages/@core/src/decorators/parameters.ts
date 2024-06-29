import {
  setActionParamMetadata,
  type TBaseActionParam,
} from '../utils/metadataUtils';

interface ICreateActionParamMetadataParams {
  name: string;
  extractor?: string;
  type: TBaseActionParam | Omit<string, TBaseActionParam>;
}

function createActionParamMetadata({
  name,
  type,
  extractor,
}: ICreateActionParamMetadataParams): ParameterDecorator {
  return (
    target: TAny,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    if (!propertyKey) {
      throw new Error(
        `${name} must be used inside parameter of controller's action`,
      );
    }

    setActionParamMetadata({
      type,
      extractor,
      propertyKey,
      parameterIndex,
      controller: target.constructor,
    });
  };
}

export function Query(extractor?: string): ParameterDecorator {
  return createActionParamMetadata({
    extractor,
    name: 'Query',
    type: 'query',
  });
}

export function Body(extractor?: string): ParameterDecorator {
  return createActionParamMetadata({
    extractor,
    name: 'Body',
    type: 'body',
  });
}

export function Param(extractor?: string): ParameterDecorator {
  return createActionParamMetadata({
    extractor,
    name: 'Param',
    type: 'param',
  });
}

export function Request(): ParameterDecorator {
  return createActionParamMetadata({
    name: 'Request',
    type: 'request',
    extractor: undefined,
  });
}
