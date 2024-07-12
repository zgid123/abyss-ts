import { IoC } from '../../core/IoC';
import { getMetadata, setMetadata } from './core';
import { INJECTABLE_IDENTITY } from '../../constants/metadata';

import type { RequiredKeys } from '../../typings';

export function getInjectableIdentity(target: TAny): string | symbol {
  if (!['function', 'object'].includes(typeof target)) {
    return target;
  }

  return getMetadata({
    target,
    key: INJECTABLE_IDENTITY,
  });
}

interface IPushToIoCContainerParams {
  target?: TAny;
  instance: TAny;
  key?: string | symbol;
}

export function pushToIoCContainer(
  params: RequiredKeys<IPushToIoCContainerParams, 'key'>,
): void;
export function pushToIoCContainer(
  params: RequiredKeys<IPushToIoCContainerParams, 'target'>,
): void;
export function pushToIoCContainer({
  key,
  target,
  instance,
}: IPushToIoCContainerParams): void {
  key ||= getMetadata({
    target,
    key: INJECTABLE_IDENTITY,
  });

  key ||= Symbol.for(target?.name || target?.toString?.());

  setMetadata({
    key,
    target: IoC,
    value: instance,
  });
}

export function getFromIoCContainer<T>(keyOrTarget: TAny): T {
  const keyType = typeof keyOrTarget;

  if (!['string', 'symbol'].includes(keyType)) {
    keyOrTarget = getInjectableIdentity(keyOrTarget);
  }

  return getMetadata<TAny>({
    target: IoC,
    key: keyOrTarget,
  });
}

export function isExistingInIoCContainer(keyOrTarget: TAny): boolean {
  return !!getFromIoCContainer(keyOrTarget);
}
