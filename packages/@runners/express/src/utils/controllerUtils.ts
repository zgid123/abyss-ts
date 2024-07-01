import { getControllerMetadata, loadControllers } from '@abyss.ts/core';

export async function mapController(): Promise<TAny[]> {
  console.log('Scanning controllers...');

  const importedControllers = await loadControllers();

  const controllers = importedControllers.reduce((result, module) => {
    const classes = Object.values(module);

    for (const klass of classes) {
      const { type } = getControllerMetadata(klass);

      if (type !== 'controller') {
        continue;
      }

      result.push(klass);
    }

    return result;
  }, []);

  console.log('Finish scanning controllers!\n');

  return controllers;
}
