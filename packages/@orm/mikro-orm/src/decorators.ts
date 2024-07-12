import {
  combine,
  pushToIoCContainer,
  getFromIoCContainer,
  setInjectParamMetadata,
  isExistingInIoCContainer,
} from '@abyss.ts/core';

import type { AnyEntity, EntityClass, EntityManager } from '@mikro-orm/core';

import { EM, ORM } from './constants';

export function InjectOrm(): ParameterDecorator {
  return (
    target: TAny,
    _propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    setInjectParamMetadata({
      target,
      parameterIndex,
      extractor: ORM,
    });
  };
}

export function InjectEm(): ParameterDecorator {
  return (
    target: TAny,
    _propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    setInjectParamMetadata({
      target,
      extractor: EM,
      parameterIndex,
    });
  };
}

export function InjectRepository(
  entity: EntityClass<AnyEntity>,
): ParameterDecorator {
  return (
    target: TAny,
    _propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    const key = Symbol.for(
      combine({ joinWith: '' }, entity.name, 'MikroOrmRepository'),
    );

    if (!isExistingInIoCContainer(key)) {
      const em = getFromIoCContainer<EntityManager>(EM);
      const repository = em.getRepository(entity);

      pushToIoCContainer({
        key,
        instance: repository,
      });
    }

    setInjectParamMetadata({
      target,
      parameterIndex,
      extractor: key,
    });
  };
}
