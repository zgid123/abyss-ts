import { IoC } from '../../core/IoC';
import { getMetadata, setMetadata } from './core';
import { INJECTABLE_IDENTITY } from '../../constants/metadata';

export function getInjectableIdentity(target: TAny): string | symbol {
  return getMetadata({
    target,
    key: INJECTABLE_IDENTITY,
  });
}

interface IPushToIoCContainerParams {
  target: TAny;
  instance: TAny;
  key?: string | symbol;
}

export function pushToIoCContainer({
  key,
  target,
  instance,
}: IPushToIoCContainerParams): void {
  key ||= getMetadata({
    target,
    key: INJECTABLE_IDENTITY,
  });

  key ||= Symbol.for(target.name || target.toString());

  setMetadata({
    key,
    target: IoC,
    value: instance,
  });
}

export function getFromIoCContainer(keyOrTarget: TAny): TAny {
  const keyType = typeof keyOrTarget;

  if (!['string', 'symbol'].includes(keyType)) {
    keyOrTarget = getInjectableIdentity(keyOrTarget);
  }

  return getMetadata<TAny>({
    target: IoC,
    key: keyOrTarget,
  });
}
