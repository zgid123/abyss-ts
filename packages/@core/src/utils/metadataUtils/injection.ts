import { IoC } from '../../core/IoC';
import { push } from '../arrayUtils';
import { deleteMetadata, getMetadata, setMetadata } from './core';
import {
  INJECT,
  INJECTABLE,
  INJECTABLE_IDENTITY,
} from '../../constants/metadata';

import type { TInjectionScopes } from '../../constants/injection';

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

  setMetadata({
    target: IoC,
    key: INJECTABLE,
    value: injections,
  });

  const key = Symbol(target.name || target.toString());

  setMetadata({
    target,
    value: key,
    key: INJECTABLE_IDENTITY,
  });
}

export function getInjectionMetadata(): IInjectionProps[] {
  return (
    getMetadata<IInjectionProps[]>({
      target: IoC,
      key: INJECTABLE,
    }) || []
  );
}

export function deleteInjectionMetadata(): void {
  deleteMetadata({
    target: IoC,
    key: INJECTABLE,
  });
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

  setMetadata({
    target,
    key: INJECT,
    value: params,
    propertyKey: 'constructor',
  });
}

interface IGetInjectParamMetadataParams {
  target: TAny;
}

export function getInjectParamMetadata({
  target,
}: IGetInjectParamMetadataParams): IInjectProps[] {
  return (
    getMetadata<IInjectProps[]>({
      target,
      key: INJECT,
      propertyKey: 'constructor',
    }) || []
  );
}
