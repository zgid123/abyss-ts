export type PartialKeys<T, K extends keyof T> = Omit<T, Extract<keyof T, K>> &
  Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, Extract<keyof T, K>> &
  Required<Pick<T, K>>;
