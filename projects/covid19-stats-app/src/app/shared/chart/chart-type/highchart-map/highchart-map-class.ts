import * as Highcharts from 'highcharts/highmaps';
import * as HC_map from 'highcharts/modules/map';

import worldData from '../../../../core/services/data/mocks/world-population.json';
import millerProjectionGeoJSON from '../../../../core/services/data/mocks/custom-world.json';


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
        text: 'Fixed tooltip with HTML'
      },

      legend: {
          title: {
              text: 'Population density per km²',
              style: {
                  color: ( // theme
                      Highcharts.defaultOptions &&
                      Highcharts.defaultOptions.legend &&
                      Highcharts.defaultOptions.legend.title &&
                      Highcharts.defaultOptions.legend.title.style &&
                      Highcharts.defaultOptions.legend.title.style.color
                  ) || 'black'
              }
          }
      },

      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },

      tooltip: {
          backgroundColor: 'none',
          borderWidth: 0,
          shadow: false,
          useHTML: true,
          padding: 0,
          pointFormat: '<span class="f32"><span class="flag {point.properties.hc-key}">' +
              '</span></span> {point.name}<br>' +
              '<span style="font-size:30px">{point.value}/km²</span>',
          positioner: () => {
              return { x: 0, y: 250 };
          }
      },

      colorAxis: {
          min: 1,
          max: 1000,
          type: 'logarithmic'
      },

      series: [{
          data: worldData,
          joinBy: ['iso-a3', 'code3'],
          name: 'Population density',
          states: {
              hover: {
                  color: '#a4edba'
              }
          }
      }] as any
    });
  }

  public setData(data: IChartData): void {
    // this.chart.data = data.payload;
  }

  public destroy(): void {
    this.chart.destroy();
  }
}
