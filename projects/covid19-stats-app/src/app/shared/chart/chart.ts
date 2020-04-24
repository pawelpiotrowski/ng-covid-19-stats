import { IChartOptionType } from './chart-type/chart-type';

export interface IChartOptions {
  categories?: string[];
  type: IChartOptionType;
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
