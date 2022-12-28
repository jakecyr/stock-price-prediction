import { DataLoader } from './interfaces/DataLoader';
import { readFile } from 'fs/promises';

export class FileDataLoader implements DataLoader {
  private readonly trainingDataPath: string;
  private readonly testingDataPath: string;

  constructor(trainingDataPath: string, testingDataPath: string) {
    this.trainingDataPath = trainingDataPath;
    this.testingDataPath = testingDataPath;
  }

  async loadData(): Promise<[string, string]> {
    const [trainData, testData]: Buffer[] = await Promise.all([
      readFile(this.trainingDataPath),
      readFile(this.testingDataPath),
    ]);

    return [trainData.toString(), testData.toString()];
  }
}
