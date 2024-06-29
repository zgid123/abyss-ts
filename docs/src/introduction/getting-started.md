# Getting Started

## Install

::: code-group

```sh [npm]
npm add @abyss.ts/express-runner

npm add -D tsx
```

```sh [pnpm]
pnpm add @abyss.ts/express-runner

pnpm add -D tsx
```

```sh [yarn]
yarn add @abyss.ts/express-runner

yarn add -D tsx
```

:::

## Create controller

```ts
// src/api/products/ProductController.ts

import { Get, Controller } from '@abyss.ts/express-runner';

@Controller('products')
export class ProductsController {
  @Get()
  index() {
    return [
      {
        id: 1,
        name: 'Shirt',
      },
    ];
  }
}
```

## Create app

```ts
// src/main.ts

import { ExpressApplication } from '@abyss.ts/express-runner';

ExpressApplication.create()
  .useBodyParser()
  .run();
```

## Run app

```json
{
  "name": "basic-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/main.ts"
  },
  "dependencies": {
    "@abyss.ts/express-runner": "^0.0.1"
  },
  "devDependencies": {
    "tsx": "^4.16.0"
  }
}
```

::: code-group

```sh [npm]
npm dev
```

```sh [pnpm]
pnpm dev
```

```sh [yarn]
yarn dev
```

:::
