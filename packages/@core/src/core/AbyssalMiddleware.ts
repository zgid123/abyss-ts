import type { AbyssalContext } from './AbyssalContext';

export interface IAbyssalMiddleware<
  TContext = unknown,
  TNext = (...args: TAny) => TAny,
> {
  use: (ctx: AbyssalContext<TContext>, next: TNext) => void;
}
