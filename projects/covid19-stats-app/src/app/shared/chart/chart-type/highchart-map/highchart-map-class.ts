import * as Highcharts from 'highcharts/highmaps';
import * as HC_map from 'highcharts/modules/map';

import millerProjectionGeoJSON from './highchart-map-geo.json';
import { IChartData, IChartOptions } from '../../chart';
import { IChartTypeInstance } from '../chart-type';

HC_map.default(Highcharts);
Highcharts.maps['custom/world'] = millerProjectionGeoJSON;

export type IHighchartMap = Highcharts.Chart;

export class HighchartMapClass implements IChartTypeInstance {
  public chart: IHighchartMap;

  public create(element: HTMLElement, options: IChartOptions, data: IChartData): void {
    console.group('Highchart Map');
    console.log('options', options);
    console.log('data', data);
    console.groupEnd();

    this.chart = Highcharts.mapChart({
      chart: {
        renderTo: element,
        map: 'custom/world'
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
      colorAxis: {
          type: 'logarithmic',
          minColor: '#fffcf4',
          maxColor: '#f4b800',
      },
      series: [
        {
          type: 'map',
          enableMouseTracking: false,
        },
        {
          name: 'Total Infected',
          type: 'mapbubble',
          data: data.payload,
          joinBy: ['iso-a2', 'code'],
          minSize: 2,
          maxSize: '10%',
          tooltip: {
            pointFormat: '{point.properties.name}: {point.z}'
          }
      }]
    });
  }

  public setData(data: IChartData): void {
    // this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
