/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';
import maxBy from 'lodash-es/maxBy';
import range from 'lodash-es/range';
import { IDataGlobalStatsUpdate } from '../../../core/services/data/data';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: IDataGlobalStatsUpdate) => {
    const worstAffectedCollection = new Set();

    range(5).forEach(() => {
      const collection = rawData?.allStats.filter((stat) => !worstAffectedCollection.has(stat));

      worstAffectedCollection.add(maxBy(collection, 'latest_data.confirmed'));
    });
    const worstAffectedCategories = Array.from(worstAffectedCollection).map((o: any) => o.name);
    const worstAffectedDeaths = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.deaths);
    const worstAffectedRecovered = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.recovered);
    const worstAffectedInfected = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.confirmed);
    const worstAffectedUnwell = worstAffectedInfected.map((wai, i) => wai - worstAffectedDeaths[i] - worstAffectedRecovered[i]);
    const payload: any = [{
      name: 'Deaths',
      data: worstAffectedDeaths,
      color: '#ef5350'
    }, {
      name: 'Recovered',
      data: worstAffectedRecovered,
      color: '#66bb6a'
    }, {
      name: 'Unwell',
      data: worstAffectedUnwell,
      color: '#29b6f6'
    }];

    return {
      categories: worstAffectedCategories,
      payload
    };
  };

  postMessage(attempt(parseRawData, data.rawData));
});
