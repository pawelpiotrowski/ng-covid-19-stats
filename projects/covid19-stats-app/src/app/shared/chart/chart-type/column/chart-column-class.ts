import Chart from 'chart.js';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartColumn } from './chart-column';

export class ChartColumnClass implements IChartTypeInstance {
  public chart: IChartColumn;

  public create(element: HTMLCanvasElement, options: IChartOptions, data: IChartData): void {
    this.chart = new Chart(element, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        animation: {
          duration: 0 // general animation time
        },
        responsiveAnimationDuration: 0,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
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
