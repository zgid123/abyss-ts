import type { AbyssalContext, IAbyssalMiddleware } from '@abyss.ts/core';
import { type MikroORM, RequestContext } from '@mikro-orm/core';

import { InjectOrm } from './decorators';

export class MikroOrmMiddleware implements IAbyssalMiddleware {
  constructor(@InjectOrm() private readonly orm: MikroORM) {}

  public use(
    _ctx: AbyssalContext<unknown>,
    next: (...args: TAny) => TAny,
  ): void {
    RequestContext.create(this.orm.em, next);
  }
}
