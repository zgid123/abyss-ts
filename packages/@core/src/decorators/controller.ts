import { setControllerMetadata } from '../utils/metadataUtils';

export function Controller(route = '/'): ClassDecorator {
  return (target: TAny) => {
    setControllerMetadata({
      route,
      controller: target,
    });
  };
}
