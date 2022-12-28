import path from 'path';
import NodeScaler from 'node-scaler';
import { FileDataLoader } from './FileDataLoader';
import { StockDataFormatter } from './StockDataFormatter';
import { DataLoader } from './interfaces/DataLoader';
import { DataFormatter } from './interfaces/DataFormatter';
import { StockDataScaler } from './StockDataScaler';
import { DataScaler } from './interfaces/DataScaler';
import { Model } from './interfaces/Model';
import { LSTMModel } from './LSTMModel';

main();

async function main() {
  const trainingDataPath = path.join(__dirname, '../data/data.csv');
  const testDataPath = path.join(__dirname, '../data/testing.csv');

  const scaler = new NodeScaler();
  const dataScaler: DataScaler = new StockDataScaler(scaler);
  const dataFormatter: DataFormatter = new StockDataFormatter(dataScaler);
  const model: Model = new LSTMModel({
    iterations: 1000,
    errorThresh: 0.001,
  });

  const dataLoader: DataLoader = new FileDataLoader(trainingDataPath, testDataPath);
  const [trainData, testData] = await dataLoader.loadData();

  const [scaledTrainingData, scaledTestingData] = dataFormatter.formatData<string, number[]>(
    trainData,
    testData,
  );

  await model.train([scaledTrainingData]);

  const forecast: number[] = await model.forecast<number, number>(scaledTestingData, 10);
  const unscaledForecast: number[] = dataScaler.unscaleValues(forecast);

  console.log('Forecast: ', unscaledForecast);
}
