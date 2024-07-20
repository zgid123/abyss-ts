import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';
import detectPort from 'detect-port';
import { createServer as createHttpServer } from 'http';
import express, { type Express, type Request, type Response } from 'express';
import {
  AbyssalContext,
  AbyssalApplication,
  getExceptionCatchClassMetadata,
} from '@abyss.ts/core';

import { asyncStorage } from './asyncStorage';
import { mapRoutes } from './utils/routeUtils';
import { BaseExceptionHandler } from './BaseExceptionHandler';

import type { INext, IRequest, IResponse } from './interface';

export class ExpressApplication extends AbyssalApplication<ExpressApplication> {
  #express: Express;
  #baseExceptionHandler: BaseExceptionHandler;

  static #app: ExpressApplication;

  private constructor() {
    super();

    this.#express = express();
    this._instance = this;
    this.#baseExceptionHandler = new BaseExceptionHandler();
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
    await this._mapConfigurations();

    this.#createContext();

    await this._mapMiddlewares();
    const controllers = await this._mapControllers();

    this._mapExceptionHandlers();
    this.#applyMiddlewares();
    this._mapInjections();

    const [routes, router] = mapRoutes(controllers);

    this.#express.use(router);
    this.#applyExceptionHandlers();

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

    this._dispose();
  }

  #createContext(): void {
    this.#express.use((req, res, next) => {
      Object.assign(req, {
        executionId: nanoid(),
      });

      const ctx = AbyssalContext.create<IRequest, IResponse>({
        request: req as IRequest,
        response: res as IResponse,
      });

      asyncStorage.run(ctx, () => {
        next();
      });
    });
  }

  #applyMiddlewares(): void {
    for (const middlewareInstace of this._middlewareInstances) {
      this.#express.use((req, res, next) => {
        const ctx =
          asyncStorage.get() ||
          AbyssalContext.create<IRequest, IResponse>({
            request: req as IRequest,
            response: res as IResponse,
          });

        middlewareInstace.use(ctx, next);
      });
    }
  }

  #applyExceptionHandlers(): void {
    for (const exceptionHandler of this._exceptionHandlers) {
      const catchClass = getExceptionCatchClassMetadata(
        exceptionHandler.constructor,
      );

      this.#express.use(
        (err: Error, _req: Request, _res: Response, next: INext) => {
          const ctx = asyncStorage.get();

          if (!catchClass || err instanceof catchClass) {
            exceptionHandler.catch(err, ctx!, next);
          } else {
            next(err);
          }
        },
      );
    }

    this.#express.use(
      (err: Error, _req: Request, _res: Response, next: INext) => {
        const ctx = asyncStorage.get();

        this.#baseExceptionHandler.catch(err, ctx!, next);
      },
    );
  }
}
