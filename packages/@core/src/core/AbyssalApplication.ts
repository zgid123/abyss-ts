import { config } from 'dotenv';

import { combine } from '../utils/stringUtils';

interface IPortProps {
  port: number;
  isStrict: boolean;
}

export abstract class AbyssalApplication<T extends AbyssalApplication<TAny>> {
  protected _instance!: T;

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
}
