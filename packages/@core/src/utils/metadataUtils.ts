import 'reflect-metadata';

import { push } from './arrayUtils';
import { sanitize } from './routeUtils';
import { ACTIONS, CONTROLLER, PARAMS } from '../constants/metadata';

export type THttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

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
  Reflect.defineMetadata(
    CONTROLLER,
    {
      type: 'controller',
      route: sanitize(route),
    },
    controller,
  );
}

export function getControllerMetadata(controller: TAny): IControllerProps {
  return Reflect.getMetadata(CONTROLLER, controller);
}

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

  Reflect.defineMetadata(ACTIONS, actions, controller);
}

export function getControllerActionMetadata(
  controller: TAny,
): IControllerActionProps[] {
  return Reflect.getMetadata(ACTIONS, controller) || [];
}

export type TBaseActionParam = 'query' | 'param' | 'body' | 'request';

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

  Reflect.defineMetadata(PARAMS, params, controller, propertyKey);
}

interface IGetActionParamMetadataParams {
  controller: TAny;
  propertyKey: string | symbol;
}

export function getActionParamMetadata({
  controller,
  propertyKey,
}: IGetActionParamMetadataParams): IActionParamProps[] {
  return Reflect.getMetadata(PARAMS, controller, propertyKey);
}
