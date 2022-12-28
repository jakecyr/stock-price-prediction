import { Model } from './interfaces/Model';

const brain = require('brain.js');

export interface LSTMOptions {
  iterations?: number;
  errorThresh?: number;
}

export class LSTMModel implements Model {
  private net: any;
  private options: LSTMOptions;

  constructor(options?: LSTMOptions) {
    this.net = new brain.recurrent.LSTMTimeStep();
    this.options = options || {};
  }

  async train<T>(data: T[]): Promise<void> {
    this.net.train(data, { ...this.options });
  }

  async forecast<T, R>(data: T[], count: number): Promise<R[]> {
    return this.net.forecast(data, count);
  }
}
