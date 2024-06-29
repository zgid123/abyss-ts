import bodyParser from 'body-parser';
import detectPort from 'detect-port';
import express, { Router, type Express } from 'express';
import { createServer as createHttpServer } from 'http';
import {
  combine,
  AbyssApplication,
  getControllerMetadata,
  getControllerActionMetadata,
} from '@abyssts/core';

import { mapParameters } from './utils/actionUtils';
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
    const controllers = await mapController();

    const routes: string[] = [];
    const router = Router();

    for (const controller of controllers) {
      const { route } = getControllerMetadata(controller);
      const actions = getControllerActionMetadata(controller);

      for (const action of actions) {
        const { exec, httpMethod, route: actionRoute, propertyKey } = action;
        const httpRoute = `/${combine({ joinWith: '/' }, route, actionRoute)}`;

        routes.push(httpRoute);

        router[httpMethod](httpRoute, (req, res) => {
          const params = mapParameters({
            controller,
            propertyKey,
            request: req,
          });

          res.send(exec(...params));
        });
      }
    }

    this.#express.use(router);

    const { port, isStrict } = this._port;
    let runningPort = port;

    if (!isStrict) {
      runningPort = await detectPort(port);
    }

    createHttpServer(this.#express).listen(runningPort);

    console.log(`Server is running on ${runningPort}`);

    if (routes.length) {
      console.log(`\n\nList routes: \n\n${routes.join('\n')}`);
    }
  }
}
