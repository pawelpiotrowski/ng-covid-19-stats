import * as Highcharts from 'highcharts';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IHighchartLine = Highcharts.Chart;

export class HighchartLineClass implements IChartTypeInstance {
  public chart: IHighchartLine;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    this.chart = Highcharts.chart({
      chart: {
        renderTo: element,
        style: {
          fontFamily: 'Roboto, Helvetica, sans-serif'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: options.title || '',
        align: 'left'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          pointStart: options.pointStart as number,
          pointInterval: 24 * 3600 * 1000
        }
      },
      series: data.payload
    });
  }

  public setData(data: IChartData): void {
    // this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
