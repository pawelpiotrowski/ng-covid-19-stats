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

      expect(globalStats.value?.allStats.length).toEqual(2);
    });
  });
});
