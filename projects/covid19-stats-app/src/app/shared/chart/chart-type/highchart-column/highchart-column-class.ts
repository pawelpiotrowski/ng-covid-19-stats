import * as Highcharts from 'highcharts';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IHighchartColumn = Highcharts.Chart;

export class HighchartColumnClass implements IChartTypeInstance {
  public chart: IHighchartColumn;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
   this.chart = Highcharts.chart({
      chart: {
        type: options.asBar === true ? 'bar' : 'column',
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
        categories: options.categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0;text-align:right;"><b>{point.y:,.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0
        },
        series: {
          stacking: options.stacking
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
