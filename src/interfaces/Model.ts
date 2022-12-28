export interface Model {
  train<T, R>(data: T[]): Promise<R | void>;
  forecast<T, R>(data: T[], count: number): Promise<R[]>;
}
