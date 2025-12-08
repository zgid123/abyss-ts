import type { IAbyssalExceptionHandler } from './core/AbyssalExceptionHandler';

export type TPartialKeys<T, K extends keyof T> = Omit<T, Extract<keyof T, K>> &
  Partial<Pick<T, K>>;

export type TRequiredKeys<T, K extends keyof T> = Omit<T, Extract<keyof T, K>> &
  Required<Pick<T, K>>;

export type TExceptionHandlerClass = new () => IAbyssalExceptionHandler;
