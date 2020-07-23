import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  IBackendCountriesLatestStatsPayload,
  IBackendCountryLatestStat,
  IBackendTimelineItem,
  IBackendTimelinePayload,
} from './backend';

export const backendCountryLatestStatsDataMock: IBackendCountryLatestStat[] = [
  {
    code: 'WL',
    coordinates: { latitude: 1, longitude: 1 },
    latest_data: {
      calculated: {
        cases_per_million_population: 2,
        death_rate: 3,
        recovered_vs_death_ratio: 4,
        recovery_rate: 5
      },
      confirmed: 6,
      critical: 7,
      deaths: 8,
      recovered: 9
    },
    name: 'Wonderland',
    population: 10,
    updated_at: 'foo'
  },
  {
    code: 'NL',
    coordinates: { latitude: 11, longitude: 11 },
    latest_data: {
      calculated: {
        cases_per_million_population: 12,
        death_rate: 13,
        recovered_vs_death_ratio: 14,
        recovery_rate: 15
      },
      confirmed: 16,
      critical: 17,
      deaths: 18,
      recovered: 19
    },
    name: 'Neverland',
    population: 20,
    updated_at: 'boo',
  }
];
export const backendTimelineStatsDataMock: IBackendTimelineItem[] = [
  {
    active: 5554677,
    confirmed: 15040502,
    date: '2020-07-22',
    deaths: 619505,
    is_in_progress: true,
    new_confirmed: 348397,
    new_deaths: 9834,
    new_recovered: 581808,
    recovered: 8866320,
    updated_at: '2020-07-22T10:22:22.512Z',
  },
  {
    active: 5402382,
    confirmed: 13541118,
    date: '2020-07-15',
    deaths: 583947,
    new_confirmed: 230006,
    new_deaths: 5475,
    new_recovered: 159681,
    recovered: 7554789,
    updated_at: '2020-07-15T02:44:59.000Z',
  },
  {
    active: 1969722,
    confirmed: 3114674,
    date: '2020-04-28',
    deaths: 217119,
    new_confirmed: 75151,
    new_deaths: 5986,
    new_recovered: 34706,
    recovered: 927833,
    updated_at: '2020-04-28T00:32:29.000Z',
  },
  {
    active: 579913,
    confirmed: 781427,
    date: '2020-03-30',
    deaths: 37570,
    new_confirmed: 62237,
    new_deaths: 3657,
    new_recovered: 15484,
    recovered: 163944,
    updated_at: '2020-03-30T20:58:55.000Z',
  },
];

export class BackendServiceMock {
  getCountriesLatestStats(): Observable<IBackendCountriesLatestStatsPayload> {
    return of({
      data: backendCountryLatestStatsDataMock,
      _cacheHit: true,
    }).pipe(delay(100));
  }

  getTimelineStats(): Observable<IBackendTimelinePayload> {
    return of({
      data: backendTimelineStatsDataMock,
      _cacheHit: true,
    }).pipe(delay(100));
  }
}
