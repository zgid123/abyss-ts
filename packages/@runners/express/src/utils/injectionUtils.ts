import {
  pushToIoCContainer,
  getFromIoCContainer,
  getInjectionMetadata,
  getInjectParamMetadata,
  type IInjectionProps,
} from '@abyss.ts/core';

export function mapInjections(): void {
  console.log('Scanning injections...');

  const injections = getInjectionMetadata();
  const groupedInjections = topologicalGroup(injections);

  for (const pack of groupedInjections) {
    for (const injection of pack) {
      const { target, scope } = injection;

      if (scope === 'singleton') {
        const metadata = getInjectParamMetadata({
          target,
        });

        const params = metadata.map(({ extractor }) => {
          return getFromIoCContainer(extractor);
        });

        const instance = new target(...params);

        pushToIoCContainer({
          target,
          instance,
        });
      }
    }
  }

  console.log('Finish scanning injections!\n');
}

export function topologicalGroup(
  injections: Array<IInjectionProps | null>,
): IInjectionProps[][] {
  const visited: Record<TAny, { visited: true; level: number }> = {};
  const result: IInjectionProps[][] = [];

  while (injections.length) {
    const removedIndexes = [];

    for (let i = 0, n = injections.length; i < n; i++) {
      const injection = injections[i];

      if (!injection) {
        removedIndexes.push(i);
        continue;
      }

      const { target } = injection;

      const params = getInjectParamMetadata({
        target,
      });

      if (!params.length) {
        result[0] ||= [];
        result[0].push(injection);
        removedIndexes.push(i);

        visited[target] = {
          level: 0,
          visited: true,
        };

        continue;
      }

      let level = 0;
      let visitedAllDependencies = true;

      params.forEach((injectable) => {
        const { extractor } = injectable;
        const visitedData = visited[extractor];

        if (visitedData) {
          level = Math.max(level, visitedData.level);
        } else {
          visitedAllDependencies = false;
        }
      });

      if (visitedAllDependencies) {
        result[level + 1] ||= [];
        result[level + 1]!.push(injection);
        removedIndexes.push(i);

        visited[target] = {
          visited: true,
          level: level + 1,
        };
      }
    }

    removedIndexes.reverse().forEach((index) => {
      injections.splice(index, 1);
    });
  }

  return result;
}
