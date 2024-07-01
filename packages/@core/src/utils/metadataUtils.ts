import 'reflect-metadata';

import { IoC } from '../core/IoC';
import { push } from './arrayUtils';
import { sanitize } from './routeUtils';
import {
  PARAMS,
  INJECT,
  ACTIONS,
  INJECTABLE,
  CONTROLLER,
  IOC_CONTAINER,
} from '../constants/metadata';

import type { TInjectionScopes } from '../constants/injection';

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
  return Reflect.getMetadata(CONTROLLER, controller) || {};
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

export type TBaseActionParam =
  | 'body'
  | 'query'
  | 'param'
  | 'request'
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
  return Reflect.getMetadata(PARAMS, controller, propertyKey) || [];
}

export interface IInjectionProps {
  target: TAny;
  scope: TInjectionScopes;
}

export function setInjectionMetadata({ scope, target }: IInjectionProps): void {
  const injections = getInjectionMetadata();

  push(injections, {
    scope,
    target,
  });

  Reflect.defineMetadata(INJECTABLE, injections, IoC);
}

export function getInjectionMetadata(): IInjectionProps[] {
  return Reflect.getMetadata(INJECTABLE, IoC) || [];
}

interface IInjectProps {
  extractor: TAny;
}

interface ISetInjectParamMetadataParams {
  target: TAny;
  extractor: TAny;
  parameterIndex: number;
}

export function setInjectParamMetadata({
  target,
  extractor,
  parameterIndex,
}: ISetInjectParamMetadataParams): void {
  let params = getInjectParamMetadata({
    target,
  });

  params = push(
    params,
    {
      extractor,
    },
    parameterIndex,
  );

  Reflect.defineMetadata(INJECT, params, target, 'constructor');
}

interface IGetInjectParamMetadataParams {
  target: TAny;
}

export function getInjectParamMetadata({
  target,
}: IGetInjectParamMetadataParams): IInjectProps[] {
  return Reflect.getMetadata(INJECT, target, 'constructor') || [];
}

interface IPushToIoCContainerParams {
  target: TAny;
  instance: TAny;
}

export function pushToIoCContainer({
  target,
  instance,
}: IPushToIoCContainerParams): void {
  Reflect.defineMetadata(IOC_CONTAINER, instance, target);
}

export function getFromIoCContainer(target: TAny): TAny {
  return Reflect.getMetadata(IOC_CONTAINER, target);
}
