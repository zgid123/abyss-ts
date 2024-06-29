import { getControllerMetadata, loadControllers } from '@abyss.ts/core';

export async function mapController(): Promise<TAny[]> {
  const importedControllers = await loadControllers();

  return importedControllers.reduce((result, module) => {
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
}
