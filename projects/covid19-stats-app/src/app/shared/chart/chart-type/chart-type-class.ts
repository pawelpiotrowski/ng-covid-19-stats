import { IChartData, IChartOptions } from '../chart';
import { IChartType, IChartTypeInstance } from './chart-type';
import { ChartPieClass } from './pie/chart-pie-class';
import { ChartColumnClass } from './column/chart-column-class';
import { ChartLineClass } from './line/chart-line-class';
import { ChartDonutClass } from './donut/chart-donut-class';
import { ChartSemiCirclePieClass } from './semi-circle-pie/chart-semi-circle-pie-class';
import { ChartFunnelClass } from './funnel/chart-funnel-class';

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
      case 'line':
        this.instance = new ChartLineClass();
        break;
      case 'donut':
        this.instance = new ChartDonutClass();
        break;
      case 'semiCirclePie':
        this.instance = new ChartSemiCirclePieClass();
        break;
      case 'funnel':
        this.instance = new ChartFunnelClass();
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
