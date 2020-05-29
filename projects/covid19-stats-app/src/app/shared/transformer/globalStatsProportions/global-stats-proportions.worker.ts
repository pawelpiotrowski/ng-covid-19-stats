/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';
import { reduceGlobalStatsPayloadToLatestNumberOf } from '../transformer-helpers';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: any) => {
    const payload = rawData.allStats;
    const deaths = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'deaths');
    const infected = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'confirmed');
    const recovered = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'recovered');
    const ill = infected - deaths - recovered;
    const colorList = ['#ef5350', '#66bb6a', '#29b6f6'];
    const labelList = ['Deaths', 'Recovered', 'Unwell'];
    const outputModel = [ deaths, recovered, ill ];
    const outputData = outputModel.map((s, i) => {
      return {
        name: labelList[i],
        y: (s * 100) / infected,
        color: colorList[i]
      };
    });

    return outputData;
  };

  postMessage(attempt(parseRawData, data.rawData));
});
