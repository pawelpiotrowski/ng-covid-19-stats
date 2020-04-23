import Chart from 'chart.js';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

export type IChartPie = Chart;

export class ChartPieClass implements IChartTypeInstance {
  public chart: IChartPie;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    console.log('options', options);
    console.log('data', data);
    const chartCanvas = element.querySelector('canvas');

    if (!chartCanvas) {
      return;
    }
    this.chart = new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: data.payload.map((d: any) => d.label),
        datasets: [{
          data: data.payload.map((d: any) => d.value),
          backgroundColor: options.settings?.colorList
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
        },
        legend: {
          onClick: () => {}
        }
      }
    });
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
