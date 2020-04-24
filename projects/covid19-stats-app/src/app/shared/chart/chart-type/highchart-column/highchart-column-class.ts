import * as Highcharts from 'highcharts';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IHighchartColumn = Highcharts.Chart;

export class HighchartColumnClass implements IChartTypeInstance {
  public chart: IHighchartColumn;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    console.group('Highchart Column');
    console.log('options', options);
    console.log('data', data);
    console.groupEnd();

    this.chart = Highcharts.chart({
      chart: {
        type: 'column',
        renderTo: element
      },
      title: {
        text: ''
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
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
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
