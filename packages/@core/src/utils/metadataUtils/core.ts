import 'reflect-metadata';

interface ISetMetadataParams {
  value: TAny;
  target: TAny;
  key: string | symbol;
  propertyKey?: string | symbol;
}

export function setMetadata({
  key,
  value,
  target,
  propertyKey,
}: ISetMetadataParams): void {
  let params: [string | symbol, TAny, TAny] = [key, value, target];

  if (propertyKey) {
    params.push(propertyKey);
  }

  Reflect.defineMetadata(...params);
}

interface IGetMetadataParams {
  target: TAny;
  key: string | symbol;
  propertyKey?: string | symbol;
}

export function getMetadata<T>({
  key,
  target,
  propertyKey,
}: IGetMetadataParams): T {
  let params: [string | symbol, TAny] = [key, target];

  if (propertyKey) {
    params.push(propertyKey);
  }

  return Reflect.getMetadata(...params) as T;
}

interface IDeleteMetadataParams {
  target: TAny;
  key: string | symbol;
}

export function deleteMetadata({ key, target }: IDeleteMetadataParams): void {
  Reflect.deleteMetadata(key, target);
}
