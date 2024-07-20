import { AsyncLocalStorage } from 'node:async_hooks';

import type { AbyssalContext } from './AbyssalContext';

export class AbyssalAsyncStorage<TRequest = unknown, TResponse = unknown> {
  #asyncStorage: AsyncLocalStorage<AbyssalContext<TRequest, TResponse>>;

  public constructor() {
    this.#asyncStorage = new AsyncLocalStorage<
      AbyssalContext<TRequest, TResponse>
    >();
  }

  public get(): AbyssalContext<TRequest, TResponse> | undefined {
    const ctx = this.#asyncStorage.getStore();

    return ctx as AbyssalContext<TRequest, TResponse>;
  }

  public run(
    ctx: AbyssalContext<TRequest, TResponse>,
    callback: (...args: TAny) => TAny,
  ) {
    return this.#asyncStorage.run(ctx, callback);
  }
}
