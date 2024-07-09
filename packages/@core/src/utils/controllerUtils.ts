import { glob } from 'glob';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

import { getControllerMetadata } from './metadataUtils';

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

export async function mapControllers(): Promise<TAny[]> {
  console.log('Scanning controllers...');

  const importedControllers = await loadControllers();

  const controllers = importedControllers.reduce((result, module) => {
    const classes = Object.values(module);

    for (const klass of classes) {
      try {
        const { type } = getControllerMetadata(klass);

        if (type !== 'controller') {
          continue;
        }

        result.push(klass);
      } catch {
        continue;
      }
    }

    return result;
  }, []);

  console.log('Finish scanning controllers!\n');

  return controllers;
}
