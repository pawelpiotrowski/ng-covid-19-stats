import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';
import { IChartColumn } from './column/chart-column';
import { IChartMapWithBubbles } from './map-with-bubbles/chart-map-with-bubbles';

export interface IChartType {
  instance: IChartTypeInstance;
  create: (element: HTMLElement, options: IChartOptions, data: IChartData) => void;
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
  | 'mapWithBubbles'
;

export type IChart = IChartPie
  | IChartColumn
  | IChartMapWithBubbles
;
