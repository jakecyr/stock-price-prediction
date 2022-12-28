export interface DataScaler {
  scaleValues(values: number[], min: number, max: number): number[];
  scaleValue(value: number): number;
  unscaleValue(value: number): number;
  unscaleValues(values: number[]): number[];
}
