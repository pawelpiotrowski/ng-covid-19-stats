/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';
import { IDataGlobalStats } from '../../../core/services/data/data';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: any) => {
    const { allStats } = rawData as IDataGlobalStats;
    const outputData = allStats
    .map((stat) => {
      return {
        code: stat.code,
        name: stat.name,
        z: stat.latest_data.confirmed
      };
    })
    .filter((stat) => stat.z > 0);

    return outputData;
  };

  postMessage(attempt(parseRawData, data.rawData));
});
