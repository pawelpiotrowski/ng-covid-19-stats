import { IChartOptions, IChartData } from '../chart';
import { IChartPie } from './pie/chart-pie';

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

/* Possible amChart types */
// PieChart
// GaugeChart
// RadarChart
// XYChart (Column)
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
  // | 'column'
  // | 'radar'
  // | 'serial'
  // | 'gauge'
  // | 'sliced'
  // | 'flowDiagram'
  // | 'sankeyDiagram'
  // | 'chordDiagram'
  // | 'treeMap'
  // | 'pie3d'
  // | 'column3d'
  ;

export type IChart = IChartPie
  // | IChartColumn
  ;
