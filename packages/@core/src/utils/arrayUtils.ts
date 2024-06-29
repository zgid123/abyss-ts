export function push<T>(source: T[] | undefined, item: T, index?: number): T[] {
  source ||= [];

  if (index === undefined) {
    source.push(item);
  } else {
    source[index] = item;
  }

  return source;
}
