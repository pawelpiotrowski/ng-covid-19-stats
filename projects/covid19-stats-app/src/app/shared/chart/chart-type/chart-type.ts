import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';
import { IChartColumn } from './column/chart-column';
import { IChartLine } from './line/chart-line';
import { IChartDonut } from './donut/chart-donut';
import { IChartSemiCirclePie } from './semi-circle-pie/chart-semi-circle-pie';
import { IChartFunnel } from './funnel/chart-funnel';

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

/* amChart types */
// PieChart
// GaugeChart
// RadarChart
// XYChart (Column, Line)
// SerialChart
// SlicedChart
// FlowDiagram
// SankeyDiagram
// ChordDiagram
// TreeMap
// PieChart3D
// XYChart3D (Column 3D)
/* */

export type IChartOptionType = 'pie'
  | 'column'
  | 'line'
  | 'donut'
  | 'semiCirclePie'
  | 'funnel'
  ;

export type IChart = IChartPie
  | IChartColumn
  | IChartLine
  | IChartDonut
  | IChartSemiCirclePie
  | IChartFunnel
  ;
