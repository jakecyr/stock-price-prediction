export interface DataFormatter {
  formatData<T extends string, R>(trainingData: T, testingData: T): [R, R];
}
