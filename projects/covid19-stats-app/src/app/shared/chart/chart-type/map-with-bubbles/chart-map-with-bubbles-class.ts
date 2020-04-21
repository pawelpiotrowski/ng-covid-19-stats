import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes from '@amcharts/amcharts4/themes/material';
import get from 'lodash-es/get';

import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';
import { IChartMapWithBubbles } from './chart-map-with-bubbles';

export class ChartMapWithBubblesClass implements IChartTypeInstance {
  public chart: IChartMapWithBubbles;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    am4core.useTheme(am4themes);

    const chart = am4core.create(element, am4maps.MapChart);
    const mapData = data.payload;

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = options.settings?.dataFieldsValue;

    const imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    const circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = 'color';
    circle.tooltipText = '{name}: [bold]{value}[/]';


    imageSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 4,
      max: 30,
      dataField: options.settings?.dataFieldsValue
    });

    imageTemplate.adapter.add('latitude', (latitude, target) => {
      const polygonId = get(target, `dataItem.dataContext.${options.settings?.dataFieldsCategory}`);
      const polygon = polygonSeries.getPolygonById(polygonId);

      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    });

    imageTemplate.adapter.add('longitude', (longitude, target) => {
      const polygonId = get(target, `dataItem.dataContext.${options.settings?.dataFieldsCategory}`);
      const polygon = polygonSeries.getPolygonById(polygonId);
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });

    this.chart = chart;
  }

  public setData(data: IChartData): void {
    this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.dispose();
  }
}
