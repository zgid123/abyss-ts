import {
  httpStatusCodes,
  type AbyssalException,
  type IAbyssalExceptionHandler,
} from '@abyss.ts/core';

import type { IContext, INext } from './interface';

export class BaseExceptionHandler implements IAbyssalExceptionHandler {
  public catch(error: AbyssalException, ctx: IContext, _next: INext): void {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      message: error.message,
      status: httpStatusCodes.internalServerError,
    });
  }
}
