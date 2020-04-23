import { IChartOptions, IChartData } from '../chart';
import { IHighchartColumn } from './highchart-column/highchart-column-class';
import { IHighchartPie } from './highchart-pie/highchart-pie-class';
import { IHighchartMap } from './highchart-map/highchart-map-class';

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

export type IChartOptionType = 'highchartColumn' | 'highchartPie' | 'highchartMap';

export type IChart = IHighchartColumn | IHighchartPie | IHighchartMap;
