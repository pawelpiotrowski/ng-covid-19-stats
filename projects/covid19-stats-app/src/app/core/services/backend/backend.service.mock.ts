import { Observable, of } from 'rxjs';

import { IBackendCountriesLatestStatsPayload, IBackendCountryLatestStat } from './backend';

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

export class BackendServiceMock {
  getCountriesLatestStats(): Observable<IBackendCountriesLatestStatsPayload> {
    return of({
      data: backendCountryLatestStatsDataMock,
      _cacheHit: true,
    });
  }
}
