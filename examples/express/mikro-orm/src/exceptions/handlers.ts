import {
  httpStatusCodes,
  type IAbyssalExceptionHandler,
  type IContext,
} from '@abyss.ts/express-runner';
import { NotFoundError } from '@mikro-orm/core';

export class MikroOrmExceptionHandler implements IAbyssalExceptionHandler {
  catch(error: Error, ctx: IContext, next: TFunction): void {
    if (error instanceof NotFoundError) {
      ctx.response.status(httpStatusCodes.notFound).send({
        message: error.message,
        status: httpStatusCodes.notFound,
      });
    } else {
      next(error);
    }
  }
}
