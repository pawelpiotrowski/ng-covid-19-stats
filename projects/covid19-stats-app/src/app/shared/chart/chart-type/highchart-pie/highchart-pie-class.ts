import * as Highcharts from 'highcharts';
import round from 'lodash-es/round';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IHighchartPie = Highcharts.Chart;

export class HighchartPieClass implements IChartTypeInstance {
  public chart: IHighchartPie;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    const formatLabel = this.formatLabel.bind(this);

    this.chart = Highcharts.chart({
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: undefined,
        plotShadow: false,
        type: 'pie',
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
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorShape: 'straight',
            crookDistance: '70%',
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          showInLegend: true
        },
        series: {
          point: {
            events: {
              legendItemClick: () => false
            }
          }
        }
      },
      legend: {
        enabled: true,
        // align: 'right',
        // layout: 'vertical',
        // floating: true,
        // verticalAlign: 'top',
        labelFormatter() {
          // cheating ts here
          const self: any = this;

          return formatLabel(self.name, self.percentage);
        }
      },
      series: [{
        name: '',
        type: 'pie',
        colorByPoint: true,
        data: data.payload,
        size: '76%',
        innerSize: options.asDonut === true ? '60%' : ''
      }]
    });
  }

  public setData(data: IChartData): void {
    // this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }

  private formatLabel(name: any, value: any) {
    // const fomatValue = `${value}`.split('.');

    return `${name} ${round(value, 1)}%`;
  }
}
