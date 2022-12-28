import { DataFormatter } from './interfaces/DataFormatter';
import { DataScaler } from './interfaces/DataScaler';

export class StockDataFormatter implements DataFormatter {
  private dataScaler: DataScaler;

  constructor(dataScaler: DataScaler) {
    this.dataScaler = dataScaler;
  }

  public formatData(trainingData: string, testingData: string): [any, any] {
    const formattedTrainingData: number[] = trainingData
      .toString()
      .split('\n')
      .map((row: string) => row.split(',')[4])
      .slice(1)
      .map((value: string) => parseFloat(value))
      .filter((value: number) => !Number.isNaN(value));

    const scaledTrainingData: number[] = this.dataScaler.scaleValues(formattedTrainingData, 0, 1);

    const scaledTestingData: number[] = testingData
      .toString()
      .split('\n')
      .map((row: string) => row.split(',')[4])
      .slice(1)
      .map((value: string) => this.dataScaler.scaleValue(parseFloat(value)))
      .filter((value: number) => !Number.isNaN(value));

    return [scaledTrainingData, scaledTestingData];
  }
}
