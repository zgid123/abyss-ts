# Controller

Controller and its actions are a fundamental part of how to build an application using Abyss.ts.

## What is a controller?

A Controller is a class used to define a set of actions to handle http requests. By using decorators, we can define routing and http handler using public method of the class.

Controller should follow the [Explicit Dependencies Principle](https://learn.microsoft.com/en-us/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#explicit-dependencies). Using constructor of the class to inject the dependencies to the controller and use it for the actions.

## Routing

Abyss.ts provides a decorator `@Controller()` to mark a class as a controller. A controller file must have a suffix `Controller` or `.controller` because Abyss.ts will auto load those controllers using this signal (e.g. `ProductsController.ts` or `products.controller.ts`).

After that, use http method decorators `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`  to define action for controller.


```ts
// src/products/ProductsController.ts

import { Controller, Get, Post } from '@abyss.ts/express-runner';

interface IProductProps {
  id: number;
  name: string;
}

@Controller('products')
export class ProductsController {
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
    return {
      id: 1,
      name: 'Shirt',
    };
  }
}
```

In the example above, it will create two urls: `GET /products` and `POST /products`.
