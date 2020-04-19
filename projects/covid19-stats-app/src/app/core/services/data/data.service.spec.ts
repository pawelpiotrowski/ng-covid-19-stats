import { TestBed, getTestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { BackendService } from '../backend/backend.service';
import { BackendServiceMock, backendCountryLatestStatsDataMock } from '../backend/backend.service.mock';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let backend: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: BackendService, useClass: BackendServiceMock },
      ]
    });
    injector = getTestBed();
    service = injector.inject(DataService);
    backend = injector.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGlobalStatsUpdates', () => {
    let backendSpy: any;

    beforeEach(() => {
      backendSpy = spyOn(backend, 'getCountriesLatestStats').and.callThrough();
    });

    it('should call backend getCountriesLatestStats', () => {
      service.getGlobalStatsUpdates();
      expect(backendSpy).toHaveBeenCalled();
    });

    it('should update globalStats subject value', () => {
      const globalStats = service.getGlobalStatsUpdates();
      const deaths1 = backendCountryLatestStatsDataMock[0].latest_data.deaths;
      const deaths2 = backendCountryLatestStatsDataMock[1].latest_data.deaths;
      const expectedDeaths = deaths1 + deaths2;
      const infected1 = backendCountryLatestStatsDataMock[0].latest_data.confirmed;
      const infected2 = backendCountryLatestStatsDataMock[1].latest_data.confirmed;
      const expectedInfected = infected1 + infected2;
      const recovered1 = backendCountryLatestStatsDataMock[0].latest_data.recovered;
      const recovered2 = backendCountryLatestStatsDataMock[1].latest_data.recovered;
      const expectedRecovered = recovered1 + recovered2;
      const expectedIll = expectedInfected - expectedDeaths - expectedRecovered;

      expect(globalStats.value).toEqual({
        deaths: expectedDeaths,
        ill: expectedIll,
        infected: expectedInfected,
        recovered: expectedRecovered
      });
    });
  });
});
