import type { AbyssalContext } from './AbyssalContext';
import type { AbyssalException } from './AbyssalException';

export interface IAbyssalExceptionHandler {
  catch(error: AbyssalException, ctx: AbyssalContext, next: TFunction): void;
}
