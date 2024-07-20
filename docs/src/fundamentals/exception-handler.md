# Exception Handler

Exception Handler is a middleware which handles all the exceptions during the application lifecycle.

By implementing `IAbyssalExceptionHandler`, we can easily create a exception handler and apply it for Abyss.ts.

## Create a exception handler

To create a exception handler, we will create a class that will implement interface `IAbyssalExceptionHandler`.

```ts
export class MyExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}
```

A exception handler has only one method `catch` to receive `AbyssalException`/`Error`, `AbyssalContext` to get the response to respond payload to client and `next` to move on to next middleware (if any).

::: warning NOTE

Always use `Error` or `AbyssalException` class to raise error instead of `throw 'some error string'`

:::

## Apply global exception handler

```ts
import { ExpressApplication } from '@abyss.ts/express-runner';

import { MyExceptionHandler } from './exceptions/handlers';

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .useExceptionHandler(MyExceptionHandler)
  .run();
```

## Catch specific exception class

Sometimes, we want to create a handler for a specific exception class only. Using decorator `Catch` to do it.

```ts
class MyException extends AbyssalException {}

@Catch(MyException)
export class MyExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}
```

`MyExceptionHandler` will catch the error that is an instance of `MyException` class. If the error is not, it will be passed to next middleware (next handler or base handler of the runner if no custom handler).

## Exception handler priority

The exception handle will be registered like a pipeline. The left one will be applied before the right one.

For more details, check this example.

```ts
class MyExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

class MyAnotherExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .useExceptionHandler(MyExceptionHandler, MyAnotherExceptionHandler)
  .run();
```

`MyExceptionHandler` will be executed whenever an exception is raised. We can pass the error to `MyAnotherExceptionHandler` by calling `next` in `MyExceptionHandler` if we want to split the handler logic.

Also, `Abyss.ts` will sort the handler that has `Catch` decorator to be executed before the one does not.

```ts
class MyExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

class MyAnotherExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

class CustomException extends AbyssalExeption {}

@Catch(CustomException)
class CustomExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

class NotFoundException extends AbyssalException {}

@Catch(NotFoundException)
class NotFoundExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .useExceptionHandler(
    MyExceptionHandler,
    NotFoundExceptionHandler,
    MyAnotherExceptionHandler,
    CustomExceptionHandler
  )
  .run();
```

The priority at this example will be `NotFoundExceptionHandler` ->  `CustomExceptionHandler` -> `MyExceptionHandler` -> `MyAnotherExceptionHandler`.

If there are two or more handlers catch one exception class, the left one will be executed before the right one. Use condition and next function to pass the error to the next exception handler if needed.
