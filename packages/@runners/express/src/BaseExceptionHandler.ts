import { httpStatusCodes, type IAbyssalExceptionHandler } from '@abyss.ts/core';

import type { IContext, INext } from './interface';

export class BaseExceptionHandler implements IAbyssalExceptionHandler {
  public async catch(error: Error, ctx: IContext, _next: INext): Promise<void> {
    const { response } = ctx;

    response.status(httpStatusCodes.internalServerError).send({
      status: httpStatusCodes.internalServerError,
      message: typeof error === 'string' ? error : error.message,
    });
  }
}
