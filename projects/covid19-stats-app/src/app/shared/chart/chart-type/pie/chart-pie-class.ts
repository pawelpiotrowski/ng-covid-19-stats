import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes from '@amcharts/amcharts4/themes/material';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartPie } from './chart-pie';

export class ChartPieClass implements IChartTypeInstance {
  public chart: IChartPie;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    am4core.useTheme(am4themes);
    const chart = am4core.create(element, am4charts.PieChart);
    // Create pie series
    const series = chart.series.push(new am4charts.PieSeries());

    series.dataFields.value = options.settings?.dataFieldsValue;
    series.dataFields.category = options.settings?.dataFieldsCategory;

    const colorSet = new am4core.ColorSet();
    const colorList = options.settings?.colorList || [];

    colorSet.list = colorList.map((color) => {
      return am4core.color(color);
    });
    series.colors = colorSet;

    chart.data = data.payload;

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
