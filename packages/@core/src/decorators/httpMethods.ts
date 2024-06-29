import {
  setControllerActionMetadata,
  type THttpMethod,
} from '../utils/metadataUtils';

interface ICreateControllerActionMetadataParams {
  route: string;
  httpMethod: THttpMethod;
}

function createControllerActionMetadata({
  route,
  httpMethod,
}: ICreateControllerActionMetadataParams): MethodDecorator {
  return (target: TAny, propertyKey: string | symbol, descriptor: TAny) => {
    setControllerActionMetadata({
      route,
      httpMethod,
      propertyKey,
      exec: descriptor.value,
      controller: target.constructor,
    });
  };
}

export function Get(route = '/'): MethodDecorator {
  return createControllerActionMetadata({
    route,
    httpMethod: 'get',
  });
}

export function Post(route = '/'): MethodDecorator {
  return createControllerActionMetadata({
    route,
    httpMethod: 'post',
  });
}

export function Put(route = '/'): MethodDecorator {
  return createControllerActionMetadata({
    route,
    httpMethod: 'put',
  });
}

export function Patch(route = '/'): MethodDecorator {
  return createControllerActionMetadata({
    route,
    httpMethod: 'patch',
  });
}

export function Delete(route = '/'): MethodDecorator {
  return createControllerActionMetadata({
    route,
    httpMethod: 'delete',
  });
}
