import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartFunnel } from './chart-funnel';

export class ChartFunnelClass implements IChartTypeInstance {
  public chart: IChartFunnel;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    const chart = am4core.create(element, am4charts.SlicedChart);

    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [{
        name: 'The first',
        value: 600
    }, {
        name: 'The second',
        value: 300
    }, {
        name: 'The third',
        value: 200
    }, {
        name: 'The fourth',
        value: 180
    }, {
        name: 'The fifth',
        value: 50
    }, {
        name: 'The sixth',
        value: 20
    }, {
        name: 'The seventh',
        value: 10
    }];

    const series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = 'value';
    series.dataFields.category = 'name';
    series.alignLabels = true;

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
