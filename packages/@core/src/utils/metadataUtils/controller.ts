import { push } from '../arrayUtils';
import { sanitize } from '../routeUtils';
import { getMetadata, setMetadata } from './core';
import { ACTIONS, CONTROLLER, PARAMS } from '../../constants/metadata';

interface IBaseSetProps {
  controller: TAny;
}

interface IControllerProps {
  route: string;
  type: 'controller';
}

export function setControllerMetadata({
  route,
  controller,
}: Omit<IControllerProps, 'type'> & IBaseSetProps): void {
  setMetadata({
    key: CONTROLLER,
    target: controller,
    value: {
      type: 'controller',
      route: sanitize(route),
    },
  });
}

export function getControllerMetadata(controller: TAny): IControllerProps {
  return (
    getMetadata<IControllerProps>({
      key: CONTROLLER,
      target: controller,
    }) || {}
  );
}

export type THttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface IControllerActionProps {
  route: string;
  type: 'action';
  exec: TFunction;
  httpMethod: THttpMethod;
  propertyKey: string | symbol;
}

export function setControllerActionMetadata({
  exec,
  route,
  controller,
  httpMethod,
  propertyKey,
}: Omit<IControllerActionProps, 'type'> & IBaseSetProps): void {
  let actions: IControllerActionProps[] =
    getControllerActionMetadata(controller);

  actions = push(actions, {
    exec,
    httpMethod,
    propertyKey,
    type: 'action',
    route: sanitize(route),
  });

  setMetadata({
    key: ACTIONS,
    value: actions,
    target: controller,
  });
}

export function getControllerActionMetadata(
  controller: TAny,
): IControllerActionProps[] {
  return (
    getMetadata<IControllerActionProps[]>({
      key: ACTIONS,
      target: controller,
    }) || []
  );
}

export type TBaseActionParam =
  | 'body'
  | 'query'
  | 'param'
  | 'request'
  | 'context'
  | 'injection';

export interface IActionParamProps {
  extractor?: string;
  type: TBaseActionParam | Omit<string, TBaseActionParam>;
}

type TSetActionParamMetadataParams = IActionParamProps &
  IBaseSetProps & {
    parameterIndex: number;
    propertyKey: string | symbol;
  };

export function setActionParamMetadata({
  type,
  extractor,
  controller,
  propertyKey,
  parameterIndex,
}: TSetActionParamMetadataParams): void {
  let params = getActionParamMetadata({
    controller,
    propertyKey,
  });

  params = push(
    params,
    {
      type,
      extractor,
    },
    parameterIndex,
  );

  setMetadata({
    key: PARAMS,
    propertyKey,
    value: params,
    target: controller,
  });
}

interface IGetActionParamMetadataParams {
  controller: TAny;
  propertyKey: string | symbol;
}

export function getActionParamMetadata({
  controller,
  propertyKey,
}: IGetActionParamMetadataParams): IActionParamProps[] {
  return (
    getMetadata<IActionParamProps[]>({
      key: PARAMS,
      propertyKey,
      target: controller,
    }) || []
  );
}
