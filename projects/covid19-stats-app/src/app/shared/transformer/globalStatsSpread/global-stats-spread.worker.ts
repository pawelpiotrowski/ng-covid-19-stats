/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';
import { IDataGlobalStatsUpdate } from '../../../core/services/data/data';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: IDataGlobalStatsUpdate) => {
    const outputData = rawData?.allStats
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
