# Dependency Injection

When developing, we usually split a complex logic into small ones by creating multiple service classes. Those services usually follow [Single responsibility principle](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#single-responsibility) to maintain and write unit test easily.

Abyss.ts already built a [Inversion of Control (IoC)](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#dependency-inversion) to archive this technique.

## Create a service

We will use class to define our service. Using `@Injectable()` decorator to mark it.

```ts
// src/products/services/GetService.ts

import { Injectable } from '@abyss.ts/express-runner';

export interface IProductProps {
  id: number;
  name: string;
}

@Injectable()
export class GetService {
  public call(): IProductProps {
    return {
      id: 1,
      name: 'Shirt',
    };
  }
}
```

## Constructor Injection

Next, we will inject the service to our controller via constructor using decorator `@Inject()`.

```ts
// src/products/ProductsController.ts

import { Controller, Get, Post, Inject } from '@abyss.ts/express-runner';

import { GetService, type IProductProps } from './services/GetService.ts';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(GetService)
    private readonly getService: GetService,
  ) {}

  @Get()
  public index(): IProductProps[] {
    return [
      {
        id: 1,
        name: 'Shirt',
      },
    ];
  }

  @Post()
  public create(): IProductProps {
    return this.getService.call();
  }
}
```

::: info NOTE

Since Abyss.ts supports fully `esm`, at the moment, TypeScript does not support parameter reflection to auto detect the injection. [Ref here](https://github.com/microsoft/TypeScript/issues/55788). That's why we need to pass the class as `@Inject()` parameter.

:::

## Lifetime

There are 3 lifetimes for the DI:

- Transient: class will be initialized whenever it is used.
- Scoped: class will be initialized for each request.
- Singleton: class will be initialized once when the application starts.

::: info NOTE

Only `Singleton` is supported at the moment.

:::
