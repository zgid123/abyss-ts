interface IContextProps<TRequest> {
  request: TRequest;
}

export class AbyssalContext<TRequest = unknown> {
  request: TRequest;

  private constructor({ request }: IContextProps<TRequest>) {
    this.request = request;
  }

  public static create<TRequest = unknown>(
    context: IContextProps<TRequest>,
  ): AbyssalContext<TRequest> {
    return new this(context);
  }
}
