export interface IAbyssalConfiguration extends AsyncDisposable {
  create(): Promise<void>;
}
