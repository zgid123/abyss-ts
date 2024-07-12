# MikroORM

`MikroORM` is one of the popular ORM for Node.js. Abyss.ts provides a plugin to integrate `MikroORM` easily.

If you are new with `MikroORM`, [check this out](https://mikro-orm.io).

## Install

First, install core packages.

::: code-group

```sh [npm]
npm add @abyss.ts/mikro-orm @mikro-orm/core @mikro-orm/migration
```

```sh [pnpm]
pnpm add @abyss.ts/mikro-orm @mikro-orm/core @mikro-orm/migration
```

```sh [yarn]
yarn add @abyss.ts/mikro-orm @mikro-orm/core @mikro-orm/migration
```

:::

Next, install driver.

::: code-group

```sh [npm]
npm add @mikro-orm/postgresql
```

```sh [pnpm]
pnpm add @mikro-orm/postgresql
```

```sh [yarn]
yarn add @mikro-orm/postgresql
```

:::

After that, we can import the `MikroOrmConfiguration` and `MikroOrmMiddleware` to the application.

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

`MikroOrmConfiguration` is for initializing `MikroORM` configuration and registering services to IoC. While `MikroOrmMiddleware` is creating [context per request](https://mikro-orm.io/docs/identity-map).

We can now inject `orm` to do the query.

```ts
@Injectable()
export class FilterService {
  constructor(
    @InjectOrm()
    private readonly orm: MikroORM,
    @InjectEm()
    private readonly em: EntityManager,
  ) {}

  public call() {
    // logic query here
  }
}
```

## Repositories

`MikroORM` supports the repository design pattern. And Abyss.ts provides a decorator to create and inject repository per model.

```ts
@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  public call() {
    return this.productRepository.findAll();
  }
}
```
