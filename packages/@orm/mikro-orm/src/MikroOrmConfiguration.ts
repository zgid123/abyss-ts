import { glob } from 'glob';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { MikroORM, type Options } from '@mikro-orm/core';
import { pushToIoCContainer, type IAbyssalConfiguration } from '@abyss.ts/core';

import { EM, ORM } from './constants';

function resolveFilePaths(paths: string[]): string[] {
  return paths.map((path) => {
    return resolve(cwd(), path);
  });
}

export class MikroOrmConfiguration implements IAbyssalConfiguration {
  #orm?: MikroORM;

  async create(): Promise<void> {
    let config: Options;
    const filePaths = await glob(
      resolveFilePaths(['**/mikro-orm.config.ts', '**/mikro-orm.config.js']),
      {
        ignore: ['node_modules/**'],
      },
    );

    const filePath = filePaths[0] || '';

    if (existsSync(filePath)) {
      config = (await import(filePath)).default;
    } else {
      throw 'Cannot find `mikro-orm.config.ts` or `mikro-orm.config.js`';
    }

    this.#orm = await MikroORM.init({
      baseDir: cwd(),
      tsNode: filePath.includes('.ts'),
      ...config,
    });

    pushToIoCContainer({
      key: ORM,
      instance: this.#orm,
    });

    pushToIoCContainer({
      key: EM,
      instance: this.#orm.em,
    });
  }

  async [Symbol.asyncDispose](): Promise<void> {
    if (this.#orm) {
      const isConnected = await this.#orm?.isConnected();

      if (isConnected) {
        await this.#orm.close();
      }
    }
  }
}
