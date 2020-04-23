import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';
import { IChartColumn } from './column/chart-column';

export interface IChartType {
  instance: IChartTypeInstance;
  create: (element: HTMLCanvasElement, options: IChartOptions, data: IChartData) => void;
  destroy: () => void;
  setData: (data: IChartData) => void;
}

type _IChartTypeInstance = Omit<IChartType, 'instance'>;

export interface IChartTypeInstance extends _IChartTypeInstance {
  chart: IChart;
}

/**
 * amChart types
 * https://www.amcharts.com/demos/#chart-types
 */

export type IChartOptionType = 'pie'
  | 'column'
;

export type IChart = IChartPie
  | IChartColumn
;
