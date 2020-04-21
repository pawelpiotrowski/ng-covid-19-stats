import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes from '@amcharts/amcharts4/themes/material';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartColumn } from './chart-column';

export class ChartColumnClass implements IChartTypeInstance {
  public chart: IChartColumn;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    am4core.useTheme(am4themes);
    // Create chart instance
    const chart = am4core.create(element, am4charts.XYChart);

    // Add data
    chart.data = [{
      country: 'USA',
      visits: 2025
    }, {
      country: 'Chi',
      visits: 1882
    }, {
      country: 'Jap',
      visits: 1809
    }, {
      country: 'Ger',
      visits: 1322
    }, {
      country: 'UK',
      visits: 1122
    }, {
      country: 'Fra',
      visits: 1114
    }, {
      country: 'Ind',
      visits: 984
    }, {
      country: 'Spa',
      visits: 711
    }, {
      country: 'Net',
      visits: 665
    }, {
      country: 'Rus',
      visits: 580
    }, {
      country: 'SKor',
      visits: 443
    }, {
      country: 'Can',
      visits: 441
    }, {
      country: 'Bra',
      visits: 395
    }];

    // Create axes

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'country';
    series.name = 'Visits';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = .8;

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
