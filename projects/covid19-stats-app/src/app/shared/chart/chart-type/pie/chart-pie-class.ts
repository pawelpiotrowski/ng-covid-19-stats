import Chart from 'chart.js';

import * as Highcharts from 'highcharts';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartPie } from './chart-pie';

export class ChartPieClass implements IChartTypeInstance {
  public chart: IChartPie;

  public create(element: HTMLCanvasElement, options: IChartOptions, data: IChartData): void {
    console.log('options', options);
    console.log('data', data);
    // this.chart = new Chart(element, {
    //   type: 'pie',
    //   data: {
    //     labels: data.payload.map((d: any) => d.label),
    //     datasets: [{
    //       data: data.payload.map((d: any) => d.value),
    //       backgroundColor: options.settings?.colorList
    //     }],
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     animation: {
    //       animateRotate: false,
    //     },
    //     legend: {
    //       onClick: () => {}
    //     }
    //   }
    // });

    Highcharts.chart({
      chart: {
          plotBackgroundColor: undefined,
          plotBorderWidth: undefined,
          plotShadow: false,
          type: 'pie',
          renderTo: element
      },
      title: {
          text: 'Browser market shares in January, 2018'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
      series: [({
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: 'Internet Explorer',
              y: 11.84
          }, {
              name: 'Firefox',
              y: 10.85
          }, {
              name: 'Edge',
              y: 4.67
          }, {
              name: 'Safari',
              y: 4.18
          }, {
              name: 'Other',
              y: 7.05
          }]
      }) as any]
  });
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
