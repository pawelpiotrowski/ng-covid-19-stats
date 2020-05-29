/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';
import { IStatisticCardStyleEnum } from '../../statistic-card/statistic-card';
import { reduceGlobalStatsPayloadToLatestNumberOf } from '../transformer-helpers';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: any) => {
    const payload = rawData.allStats;
    const deaths = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'deaths');
    const infected = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'confirmed');
    const recovered = reduceGlobalStatsPayloadToLatestNumberOf(payload, 'recovered');
    const ill = infected - deaths - recovered;
    const outputData = [
      {
        label: 'Infected',
        style: IStatisticCardStyleEnum.warn,
        value: infected
      },
      {
        label: 'Deaths',
        style: IStatisticCardStyleEnum.err,
        value: deaths
      },
      {
        label: 'Recovered',
        style: IStatisticCardStyleEnum.scs,
        value: recovered
      },
      {
        label: 'Unwell',
        style: IStatisticCardStyleEnum.neut,
        value: ill
      }
    ];

    return outputData;
  };

  postMessage(attempt(parseRawData, data.rawData));
});
