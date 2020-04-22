/// <reference lib="webworker" />
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes from '@amcharts/amcharts4/themes/material';

import * as lodash from 'lodash-es';

import { DataServiceMock } from '../../../core/services/data/data.service.mock';

addEventListener('message', ({ data }) => {
  console.log(lodash.isEmpty(data));
  console.log(data);
  const response = `worker response to ${data.hello}`;
  postMessage(response);
});
