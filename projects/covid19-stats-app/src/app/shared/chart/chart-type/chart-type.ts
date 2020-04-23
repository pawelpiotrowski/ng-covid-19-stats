import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie-class';
import { IChartColumn } from './column/chart-column-class';
import { IHighchartColumn } from './highchart-column/highchart-column-class';
import { IHighchartPie } from './highchart-pie/highchart-pie-class';

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

export type IChartOptionType = 'pie'
  | 'column'
  | 'highchartColumn'
  | 'highchartPie'
;

export type IChart = IChartPie
  | IChartColumn
  | IHighchartColumn
  | IHighchartPie
;
