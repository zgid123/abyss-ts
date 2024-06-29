export function sanitize(path: string): string {
  return path.replace(/^\/|\/$/g, '');
}
