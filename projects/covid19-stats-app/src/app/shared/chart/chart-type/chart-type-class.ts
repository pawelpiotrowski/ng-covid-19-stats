import { IChartData, IChartOptions } from '../chart';
import { IChartType, IChartTypeInstance } from './chart-type';
import { ChartPieClass } from './pie/chart-pie-class';
import { ChartColumnClass } from './column/chart-column-class';
import { ChartMapWithBubblesClass } from './map-with-bubbles/chart-map-with-bubbles-class';

export class ChartTypeClass implements IChartType {
  public instance: IChartTypeInstance;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    switch (options.type) {
      case 'pie':
        this.instance = new ChartPieClass();
        break;
      case 'column':
        this.instance = new ChartColumnClass();
        break;
      case 'mapWithBubbles':
        this.instance = new ChartMapWithBubblesClass();
        break;
      default:
        this.instance = new ChartColumnClass();
    }
    this.instance.create(element, options, data);
  }

  public setData(data: IChartData): void {
    this.instance.setData(data);
  }

  public destroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }
}
