import { IChartOptionType } from './chart-type/chart-type';

export interface IChartOptions {
  type: IChartOptionType;
  categories?: string[]; // column or bar
  pointStart?: Date | number; // line
  asDonut?: boolean; // pie
  asBar?: boolean; // column
  title?: string;
  stacking?: 'normal' | 'overlap' | 'percent' | 'stream'; // column or bar
}

export interface IChartData {
  payload: any;
}

export interface IChartArgumentsReady {
  data: boolean;
  options: boolean;
  element: boolean;
}

export type IChartArgumentReadyFlag = 'data' | 'options' | 'element';
