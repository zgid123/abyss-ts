import { config } from 'dotenv';

import { combine } from '../utils/stringUtils';
import { mapInjections } from '../utils/injectionUtils';
import { mapControllers } from '../utils/controllerUtils';
import {
  getFromIoCContainer,
  getInjectableIdentity,
  getInjectParamMetadata,
  getExceptionCatchClassMetadata,
} from '../utils/metadataUtils';

import type { TExceptionHandlerClass } from '../typings';
import type { IAbyssalMiddleware } from './AbyssalMiddleware';
import type { IAbyssalConfiguration } from './AbyssalConfiguration';
import type { IAbyssalExceptionHandler } from './AbyssalExceptionHandler';

interface IPortProps {
  port: number;
  isStrict: boolean;
}

type TMiddlewareClass = new (...args: TAny[]) => IAbyssalMiddleware;
type TConfigurationClass = new (...args: TAny[]) => IAbyssalConfiguration;

export abstract class AbyssalApplication<T extends AbyssalApplication<TAny>> {
  protected _instance!: T;
  protected _configurations: TConfigurationClass[] = [];
  protected _middlewareInstances: IAbyssalMiddleware[] = [];
  protected _exceptionHandlers: IAbyssalExceptionHandler[] = [];

  #middlewares: TMiddlewareClass[] = [];
  #exceptionHandlers: TExceptionHandlerClass[] = [];
  #configurationInstances: IAbyssalConfiguration[] = [];

  protected _port: IPortProps = {
    port: 3_000,
    isStrict: false,
  };

  protected constructor() {}

  public static create(): AbyssalApplication<TAny> {
    throw 'Must implement static create method';
  }

  public usePort(port: Partial<IPortProps>): T {
    Object.assign(this._port, port);

    return this._instance as T;
  }

  public useMiddleware(...middlewares: TMiddlewareClass[]): T {
    this.#middlewares.push(...middlewares);

    return this._instance as T;
  }

  public useExceptionHandler(
    ...exceptionHandlers: TExceptionHandlerClass[]
  ): T {
    this.#exceptionHandlers.push(...exceptionHandlers);

    return this._instance as T;
  }

  public useConfiguration(...configurations: TConfigurationClass[]): T {
    this._configurations.push(...configurations);

    return this._instance as T;
  }

  public loadEnv(): AbyssalApplication<TAny> {
    config({
      path: '.env',
    });

    const envFile = combine(
      { joinWith: '.' },
      '.env',
      process.env.NODE_ENV || 'development',
    );

    config({
      override: true,
      path: [envFile, `${envFile}.local`, '.env.local'],
    });

    return this._instance as T;
  }

  public async run(): Promise<void> {
    throw 'Must implement run method';
  }

  protected async _mapConfigurations(): Promise<void[]> {
    return Promise.all(
      this._configurations.map((configuration) => {
        const instance: IAbyssalConfiguration = new configuration();
        this.#configurationInstances.push(instance);

        return instance.create();
      }),
    );
  }

  protected async _mapMiddlewares(): Promise<void[]> {
    return Promise.all(
      this.#middlewares.map((middleware) => {
        const metadata = getInjectParamMetadata({
          target: middleware,
        });

        const params = metadata.map(({ extractor }) => {
          const extractorKey = ['string', 'symbol'].includes(typeof extractor)
            ? extractor
            : getInjectableIdentity(extractor);

          return getFromIoCContainer(extractorKey);
        });

        const instance = new middleware(...params);

        this._middlewareInstances.push(instance);
      }),
    );
  }

  protected _mapExceptionHandlers(): void {
    const allExceptionHandlers: IAbyssalExceptionHandler[] = [];
    const singleExceptionHandlers: IAbyssalExceptionHandler[] = [];

    for (const exceptionHandler of this.#exceptionHandlers) {
      const catchClass = getExceptionCatchClassMetadata(exceptionHandler);
      const exceptionHandlerInstance = new exceptionHandler();

      if (catchClass) {
        singleExceptionHandlers.push(exceptionHandlerInstance);
      } else {
        allExceptionHandlers.push(exceptionHandlerInstance);
      }
    }

    this._exceptionHandlers = this._exceptionHandlers.concat(
      singleExceptionHandlers,
      allExceptionHandlers,
    );
  }

  protected _mapControllers(): Promise<TAny[]> {
    return mapControllers();
  }

  protected _mapInjections(): void {
    return mapInjections();
  }

  protected _dispose(): void {
    const dispose = async () => {
      await Promise.all(
        this.#configurationInstances.map((instance) => {
          return instance[Symbol.asyncDispose]();
        }),
      );

      process.exit(0);
    };

    process.on('SIGINT', dispose);
    process.on('SIGTERM', dispose);
  }
}
