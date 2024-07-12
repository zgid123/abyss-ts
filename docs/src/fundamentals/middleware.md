# Middleware

Middleware is for registering middlewares to intercept and manipulate resources (request, response, ...) before handling route action.

By implementing `IAbyssalMiddleware`, we can easily create a middleware and apply it for Abyss.ts.

## Create a middleware

To create a configuration, we will create a class that will implement interface `IAbyssalMiddleware`.

```ts
import { RequestContext, type MikroORM } from '@mikro-orm/core';

import type { AbyssalContext, IAbyssalMiddleware } from '@abyss.ts/core';

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
```

A middleware has only one method `use` to receive `AbyssalContext` to intercept the `request` and `next` to move on to next middleware (if any).

::: warning NOTE

Always remember to call `next` or else you will be stuck at this step.

:::

You can inject services from IoC to the constructor of the middleware. And use it in the `use` method.

::: warning NOTE

You can only inject services from all configurations that you already applied and from all middlewares that are registered before this middleware.

:::


## Apply global middleware

```ts
import { ExpressApplication } from '@abyss.ts/express-runner';
import { MikroOrmConfiguration, MikroOrmMiddleware } from '@abyss.ts/mikro-orm';

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .useConfiguration(MikroOrmConfiguration)
  .useMiddleware(MikroOrmMiddleware)
  .run();
```

The middleware will be registered like a pipeline. That means the middlewares are applied from left to right.
