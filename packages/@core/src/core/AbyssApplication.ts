interface IPortProps {
  port: number;
  isStrict: boolean;
}

export abstract class AbyssApplication<T extends AbyssApplication<TAny>> {
  protected _instance!: T;

  protected _port: IPortProps = {
    port: 3_000,
    isStrict: false,
  };

  protected constructor() {}

  public static create(): AbyssApplication<TAny> {
    throw 'Must implement static create method';
  }

  public usePort(port: Partial<IPortProps>): T {
    Object.assign(this._port, port);

    return this._instance as T;
  }

  public async run(): Promise<void> {
    throw 'Must implement run method';
  }
}
