import { IChartData, IChartOptions } from '../chart';
import { IChartType, IChartTypeInstance } from './chart-type';
import { HighchartColumnClass } from './highchart-column/highchart-column-class';
import { HighchartPieClass } from './highchart-pie/highchart-pie-class';
import { HighchartMapClass } from './highchart-map/highchart-map-class';
import { HighchartLineClass } from './highchart-line/highchart-line-class';

export class ChartTypeClass implements IChartType {
  public instance: IChartTypeInstance;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    switch (options.type) {
      case 'highchartLine':
        this.instance = new HighchartLineClass();
        break;
      case 'highchartColumn':
        this.instance = new HighchartColumnClass();
        break;
      case 'highchartPie':
        this.instance = new HighchartPieClass();
        break;
      case 'highchartMap':
        this.instance = new HighchartMapClass();
        break;
      default:
        this.instance = new HighchartLineClass();
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
