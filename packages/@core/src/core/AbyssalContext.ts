interface IContextProps<TRequest, TResponse> {
  request: TRequest;
  response: TResponse;
}

export class AbyssalContext<TRequest = unknown, TResponse = unknown> {
  request: TRequest;
  response: TResponse;

  private constructor({
    request,
    response,
  }: IContextProps<TRequest, TResponse>) {
    this.request = request;
    this.response = response;
  }

  public static create<TRequest = unknown, TResponse = unknown>(
    context: IContextProps<TRequest, TResponse>,
  ): AbyssalContext<TRequest, TResponse> {
    return new this(context);
  }
}
