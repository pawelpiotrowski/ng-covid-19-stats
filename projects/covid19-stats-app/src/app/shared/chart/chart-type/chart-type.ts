import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';
import { IChartColumn } from './column/chart-column';
import { IChartLine } from './line/chart-line';

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
  ;

export type IChart = IChartPie
  | IChartColumn
  | IChartLine
  ;
