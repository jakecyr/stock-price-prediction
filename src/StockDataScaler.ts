import { DataScaler } from './interfaces/DataScaler';
import NodeScaler, { ScaleValue, UnscaleValue, UnscaleValues } from 'node-scaler';

export class StockDataScaler implements DataScaler {
  private nodeScaler: NodeScaler;
  private unscaleValuesRef: UnscaleValues | null;
  private unscaleValueRef: UnscaleValue | null;
  private scaleValueRef: ScaleValue | null;

  constructor(scaler: NodeScaler) {
    this.nodeScaler = scaler;
    this.unscaleValuesRef = null;
    this.unscaleValueRef = null;
    this.scaleValueRef = null;
  }

  scaleValues(values: number[], min: number, max: number): number[] {
    const response = this.nodeScaler.scaleValues(values, min, max);

    this.unscaleValueRef = response.unscaleValue;
    this.unscaleValuesRef = response.unscaleValues;
    this.scaleValueRef = response.scaleValue;

    return response.values;
  }

  scaleValue(value: number): number {
    if (!this.scaleValueRef) {
      throw new Error('Scale value reference is not set');
    }

    return this.scaleValueRef(value);
  }

  unscaleValue(value: number): number {
    if (!this.unscaleValueRef) {
      throw new Error('Unscale value reference is not set');
    }

    return this.unscaleValueRef(value);
  }

  unscaleValues(values: number[]): number[] {
    if (!this.unscaleValuesRef) {
      throw new Error('Unscale values reference is not set');
    }

    return this.unscaleValuesRef(values);
  }
}
