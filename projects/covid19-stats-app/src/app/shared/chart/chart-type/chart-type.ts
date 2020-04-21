import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';
import { IChartColumn } from './column/chart-column';
import { IChartLine } from './line/chart-line';
import { IChartDonut } from './donut/chart-donut';
import { IChartSemiCirclePie } from './semi-circle-pie/chart-semi-circle-pie';
import { IChartFunnel } from './funnel/chart-funnel';
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
  | 'line'
  | 'donut'
  | 'semiCirclePie'
  | 'funnel'
  | 'mapWithBubbles'
;

export type IChart = IChartPie
  | IChartColumn
  | IChartLine
  | IChartDonut
  | IChartSemiCirclePie
  | IChartFunnel
  | IChartMapWithBubbles
;
