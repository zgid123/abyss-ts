import type { AbyssalContext } from './AbyssalContext';

export interface IAbyssalExceptionHandler {
  catch(error: Error, ctx: AbyssalContext, next: TFunction): void;
}
