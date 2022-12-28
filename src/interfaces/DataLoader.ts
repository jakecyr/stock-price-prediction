export interface DataLoader {
  loadData(): Promise<[any, any]>;
}
