import { AsyncLocalStorage } from 'node:async_hooks';

import type { AbyssalContext } from './AbyssalContext';

export class AbyssalAsyncStorage<TRequest = unknown> {
  #asyncStorage: AsyncLocalStorage<AbyssalContext<TRequest>>;

  public constructor() {
    this.#asyncStorage = new AsyncLocalStorage<AbyssalContext<TRequest>>();
  }

  public get(): AbyssalContext<TRequest> | undefined {
    const ctx = this.#asyncStorage.getStore();

    return ctx as AbyssalContext<TRequest>;
  }

  public run(ctx: AbyssalContext<TRequest>, callback: (...args: TAny) => TAny) {
    return this.#asyncStorage.run(ctx, callback);
  }
}
