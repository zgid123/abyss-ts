import { getMetadata, setMetadata } from './core';
import { IOC_CONTAINER } from '../../constants/metadata';

interface IPushToIoCContainerParams {
  target: TAny;
  instance: TAny;
}

export function pushToIoCContainer({
  target,
  instance,
}: IPushToIoCContainerParams): void {
  setMetadata({
    target,
    value: instance,
    key: IOC_CONTAINER,
  });
}

export function getFromIoCContainer(target: TAny): TAny {
  return getMetadata<TAny>({
    target,
    key: IOC_CONTAINER,
  });
}
