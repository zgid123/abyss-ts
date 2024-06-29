import { glob } from 'glob';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

function resolveFilePaths(paths: string[]): string[] {
  return paths.map((path) => {
    return resolve(cwd(), path);
  });
}

export async function loadControllers(): Promise<TAny[]> {
  const filePaths = await glob(
    resolveFilePaths(['**/*Controller.ts', '**/*.controller.ts']),
    {
      ignore: ['node_modules/**'],
    },
  );

  return Promise.all(
    filePaths.map((filePath) => {
      return import(filePath);
    }),
  );
}
