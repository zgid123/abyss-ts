# Configuration

Configuration is used for creating a third-party plugin for Abyss.ts.

By implementing `IAbyssalConfiguration`, we can create a plugin like `MikroORM`, `TypeORM`, ... and apply it for Abyss.ts. The configuration uses `AsyncDisposable` to clean up resource when the application is exiting.

::: warning NOTE

Always remember to clean up your configuration resources to reduce the memory leak.

:::

## Create a configuration

To create a configuration, we will create a class that will implement interface `IAbyssalConfiguration`.

```ts
import { glob } from 'glob';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { MikroORM, type Options } from '@mikro-orm/core';
import { pushToIoCContainer, type IAbyssalConfiguration } from '@abyss.ts/core';

import { EM, ORM } from './constants';

function resolveFilePaths(paths: string[]): string[] {
  return paths.map((path) => {
    return resolve(cwd(), path);
  });
}

export class MikroOrmConfiguration implements IAbyssalConfiguration {
  #orm?: MikroORM;

  async create(): Promise<void> {
    let config: Options;
    const filePaths = await glob(
      resolveFilePaths(['**/mikro-orm.config.ts', '**/mikro-orm.config.js']),
      {
        ignore: ['node_modules/**'],
      },
    );

    const filePath = filePaths[0] || '';

    if (existsSync(filePath)) {
      config = (await import(filePath)).default;
    } else {
      throw 'Cannot find `mikro-orm.config.ts` or `mikro-orm.config.js`';
    }

    this.#orm = await MikroORM.init({
      baseDir: cwd(),
      tsNode: filePath.includes('.ts'),
      ...config,
    });

    pushToIoCContainer({
      key: ORM,
      instance: this.#orm,
    });

    pushToIoCContainer({
      key: EM,
      instance: this.#orm.em,
    });
  }

  async [Symbol.asyncDispose](): Promise<void> {
    if (this.#orm) {
      const isConnected = await this.#orm?.isConnected();

      if (isConnected) {
        await this.#orm.close();
      }
    }
  }
}
```

A configuration has two methods: `create` and `Symbol.asyncDispose`.

`create` method acts like a constructor, usually to initial and register services to the IoC.

`Symbol.asyncDispose` is from new feature of `TypeScript 5.2` called [`AsyncDisposable`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management). This is used for clean up resource (for the example above, we need to close the `orm`), and is called when Node.js receives signal `SIGINT` and `SIGTERM`.

## Apply configuration

Applying configuration simply calls chaining method from `AbyssalApplication`, the application will auto create it automatically.

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

## Use configuration's injection

Since the configuration registers `ORM` and `EM` to the IoC, we can inject those to the services/controllers and do the query.

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

```ts
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(FilterService) private readonly filterService: FilterService,
  ) {}

  @Get()
  async index() {
    return this.filterService.call();
  }
}
```
