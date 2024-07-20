interface IOptionsProps {
  cause?: string;
  customCode?: number;
  statusCode?: number;
}

export class AbyssalException extends Error {
  public customCode?: number;
  public statusCode?: number;

  constructor(message: string, options?: IOptionsProps) {
    const { cause, customCode, statusCode = 500 } = options || {};

    super(message, { cause });
    this.customCode = customCode;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }

  public toJson(): Omit<AbyssalException, 'toJson'> {
    return {
      name: this.name,
      stack: this.stack,
      cause: this.cause,
      message: this.message,
      customCode: this.customCode,
      statusCode: this.statusCode,
    };
  }
}
