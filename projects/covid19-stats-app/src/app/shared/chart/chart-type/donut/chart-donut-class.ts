import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartDonut } from './chart-donut';

export class ChartDonutClass implements IChartTypeInstance {
  public chart: IChartDonut;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    const chart = am4core.create(element, am4charts.PieChart);

    chart.data = [{
      country: 'Lithuania',
      litres: 501.9
    }, {
      country: 'Czech Republic',
      litres: 301.9
    }, {
      country: 'Ireland',
      litres: 201.1
    }, {
      country: 'Germany',
      litres: 165.8
    }, {
      country: 'Australia',
      litres: 139.9
    }, {
      country: 'Austria',
      litres: 128.3
    }, {
      country: 'UK',
      litres: 99
    }, {
      country: 'Belgium',
      litres: 60
    }, {
      country: 'The Netherlands',
      litres: 50
    }];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
