import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartLine } from './chart-line';

export class ChartLineClass implements IChartTypeInstance {
  public chart: IChartLine;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    const chart = am4core.create(element, am4charts.XYChart);

    // Add data
    chart.data = [{
      date: '2012-03-01',
      price: 20
    }, {
      date: '2012-03-02',
      price: 75
    }, {
      date: '2012-03-03',
      price: 15
    }, {
      date: '2012-03-04',
      price: 75
    }, {
      date: '2012-03-05',
      price: 158
    }, {
      date: '2012-03-06',
      price: 57
    }, {
      date: '2012-03-07',
      price: 107
    }, {
      date: '2012-03-08',
      price: 89
    }, {
      date: '2012-03-09',
      price: 75
    }, {
      date: '2012-03-10',
      price: 132
    }, {
      date: '2012-03-11',
      price: 380
    }, {
      date: '2012-03-12',
      price: 56
    }, {
      date: '2012-03-13',
      price: 169
    }, {
      date: '2012-03-14',
      price: 24
    }, {
      date: '2012-03-15',
      price: 147
    }];

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'price';
    series.dataFields.dateX = 'date';
    series.tensionX = 0.8;
    series.strokeWidth = 3;

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color('#000');
    chart.cursor.lineX.fillOpacity = 0.1;

    // Add scrollbar
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add a guide
    // const range = valueAxis.axisRanges.create();
    // range.value = 90.4;
    // range.grid.stroke = am4core.color('#396478');
    // range.grid.strokeWidth = 1;
    // range.grid.strokeOpacity = 1;
    // range.grid.strokeDasharray = '3,3';
    // range.label.inside = true;
    // range.label.text = 'Average';
    // range.label.fill = range.grid.stroke;
    // range.label.verticalCenter = 'bottom';

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
