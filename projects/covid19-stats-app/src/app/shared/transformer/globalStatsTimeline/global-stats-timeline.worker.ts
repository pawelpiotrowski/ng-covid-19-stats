/// <reference lib="webworker" />

import attempt from 'lodash-es/attempt';

addEventListener('message', ({ data }) => {
  const parseRawData = (rawData: any) => {
    const payload: any = [{
      name: 'Infected',
      data: rawData.map((c: any) => c.confirmed).reverse(),
      color: '#ffca28'
    }, {
      name: 'Deaths',
      data: rawData.map((c: any) => c.deaths).reverse(),
      color: '#ef5350'
    }, {
      name: 'Recovered',
      data: rawData.map((c: any) => c.recovered).reverse(),
      color: '#66bb6a'
    }, {
      name: 'Unwell',
      data: rawData.map((c: any) => c.active).reverse(),
      color: '#29b6f6'
    }];
    const firstTimeLineItem = rawData[rawData.length - 1];
    const splitFirstTimeLineItemDate = firstTimeLineItem.date.split('-').map((s: any) => Number(s));
    const pointStart = Date.UTC(splitFirstTimeLineItemDate[0], splitFirstTimeLineItemDate[1] - 1, splitFirstTimeLineItemDate[2]);

    return { pointStart, payload };
  };

  postMessage(attempt(parseRawData, data.rawData));
});
