import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';
import detectPort from 'detect-port';
import express, { type Express } from 'express';
import { AbyssApplication } from '@abyss.ts/core';
import { createServer as createHttpServer } from 'http';

import { mapRoutes } from './utils/routeUtils';
import { mapInjections } from './utils/injectionUtils';
import { mapController } from './utils/controllerUtils';

export class ExpressApplication extends AbyssApplication<ExpressApplication> {
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
    this.#express.use((req, _res, next) => {
      Object.assign(req, {
        executionId: nanoid(),
      });

      next();
    });

    const controllers = await mapController();

    mapInjections();

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
}
