import {
  pushToIoCContainer,
  getFromIoCContainer,
  getInjectionMetadata,
  getInjectableIdentity,
  getInjectParamMetadata,
  deleteInjectionMetadata,
  type IInjectionProps,
} from './metadataUtils';

function topologicalGroup(
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

          visited[extractor] = {
            visited: true,
            level: Math.max(level - 1, 0),
          };
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

export function mapInjections(): void {
  console.log('Scanning injections...');

  const injections = getInjectionMetadata();
  const groupedInjections = topologicalGroup(injections);

  for (const pack of groupedInjections) {
    if (!pack?.length) {
      continue;
    }

    for (const injection of pack) {
      const { target, scope } = injection;

      if (scope === 'singleton') {
        const metadata = getInjectParamMetadata({
          target,
        });

        const params = metadata.map(({ extractor }) => {
          const extractorKey = getInjectableIdentity(extractor);

          return getFromIoCContainer(extractorKey);
        });

        const instance = new target(...params);

        pushToIoCContainer({
          target,
          instance,
        });
      }
    }
  }

  deleteInjectionMetadata();

  console.log('Finish scanning injections!\n');
}
