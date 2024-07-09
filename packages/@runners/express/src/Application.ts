import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';
import detectPort from 'detect-port';
import express, { type Express } from 'express';
import { createServer as createHttpServer } from 'http';
import { AbyssalContext, AbyssalApplication } from '@abyss.ts/core';

import { asyncStorage } from './asyncStorage';
import { mapRoutes } from './utils/routeUtils';

import type { IRequest } from './interface';

export class ExpressApplication extends AbyssalApplication<ExpressApplication> {
  #express: Express;

  static #app: ExpressApplication;

  private constructor() {
    super();

    this.#express = express();
    this._instance = this;
  }

  public static create(): ExpressApplication {
    if (!this.#app) {
      this.#app = new this();
    }

    return this.#app._instance;
  }

  public useBodyParser(): ExpressApplication {
    this.#express.use(bodyParser.json());
    this.#express.use(bodyParser.urlencoded({ extended: true }));

    return this._instance;
  }

  public async run(): Promise<void> {
    const controllers = await this._mapControllers();

    this._mapInjections();
    this.#createContext();

    const [routes, router] = mapRoutes(controllers);

    this.#express.use(router);

    const { port, isStrict } = this._port;
    let runningPort = port;

    if (!isStrict) {
      runningPort = await detectPort(port);
    }

    createHttpServer(this.#express).listen(runningPort);

    console.log(`Server is running on ${runningPort}`);

    if (routes.length) {
      console.log(`\n\nList routes: \n${routes.join('\n')}`);
    }
  }

  #createContext(): void {
    this.#express.use((req, _res, next) => {
      Object.assign(req, {
        executionId: nanoid(),
      });

      const ctx = AbyssalContext.create<IRequest>({
        request: req as IRequest,
      });

      asyncStorage.run(ctx, () => {
        next();
      });
    });
  }
}
