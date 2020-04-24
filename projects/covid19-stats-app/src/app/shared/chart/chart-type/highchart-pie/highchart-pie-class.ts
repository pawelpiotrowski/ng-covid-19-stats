import * as Highcharts from 'highcharts';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IHighchartPie = Highcharts.Chart;

export class HighchartPieClass implements IChartTypeInstance {
  public chart: IHighchartPie;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    console.group('Highchart Pie');
    console.log('options', options);
    console.log('data', data);
    console.groupEnd();

    this.chart = Highcharts.chart({
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: undefined,
        plotShadow: false,
        type: 'pie',
        renderTo: element
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: '',
        type: 'pie',
        colorByPoint: true,
        data: data.payload
      }]
    });
  }

  public setData(data: IChartData): void {
    // this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
