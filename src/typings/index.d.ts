declare module 'node-scaler' {
  export type ScaleValue = (value: number) => number;
  export type UnscaleValue = (value: number) => number;
  export type UnscaleValues = (values: number[]) => number[];

  export interface ScaleValuesResponse {
    values: number[];
    scaleValue: ScaleValue;
    unscaleValue: UnscaleValue;
    unscaleValues: UnscaleValues;
  }

  export default class NodeScaler {
    scaleValues(values: number[], min: number, max: number): ScaleValuesResponse;
  }
}
