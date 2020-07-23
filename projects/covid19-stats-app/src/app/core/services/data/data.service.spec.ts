import { TestBed, getTestBed, async } from '@angular/core/testing';

import { DataService } from './data.service';
import { BackendService } from '../backend/backend.service';
import {
  BackendServiceMock,
  backendCountryLatestStatsDataMock,
  backendTimelineStatsDataMock,
} from '../backend/backend.service.mock';

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
    describe('when globalStats subject has no value', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getCountriesLatestStats').and.callThrough();
      });

      it('should call backend getCountriesLatestStats', () => {
        service.getGlobalStatsUpdates();
        expect(backendSpy).toHaveBeenCalled();
      });

      it('should return globalStats subject', () => {
        const globalStats = service.getGlobalStatsUpdates();

        expect(typeof globalStats.next).toEqual('function');
      });
    });

    describe('when globalStats subject has value', () => {
      let backendSpy: any;

      beforeEach(() => {
        service.getGlobalStatsUpdates();
        backendSpy = spyOn(backend, 'getCountriesLatestStats').and.callThrough();
      });

      it('should NOT call backend getCountriesLatestStats', () => {
        service.getGlobalStatsUpdates();
        expect(backendSpy).not.toHaveBeenCalled();
      });

      it('should return globalStats subject', () => {
        const globalStats = service.getGlobalStatsUpdates();

        expect(typeof globalStats.next).toEqual('function');
      });
    });
  });

  describe('getTimelineStatsUpdates', () => {
    describe('when timelineStats subject has no value', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getTimelineStats').and.callThrough();
      });

      it('should call backend getTimelineStats', () => {
        service.getTimelineStatsUpdates();
        expect(backendSpy).toHaveBeenCalled();
      });

      it('should return timelineStats subject', () => {
        const timelineStats = service.getTimelineStatsUpdates();

        expect(typeof timelineStats.next).toEqual('function');
      });
    });

    describe('when timelineStats subject has value', () => {
      let backendSpy: any;

      beforeEach(() => {
        service.getTimelineStatsUpdates();
        backendSpy = spyOn(backend, 'getTimelineStats').and.callThrough();
      });

      it('should NOT call backend getTimelineStats', () => {
        service.getTimelineStatsUpdates();
        expect(backendSpy).not.toHaveBeenCalled();
      });

      it('should return globalStats subject', () => {
        const timelineStats = service.getTimelineStatsUpdates();

        expect(typeof timelineStats.next).toEqual('function');
      });
    });
  });

  describe('fetchGlobalStats', () => {
    describe('when fetching is in progress', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getCountriesLatestStats').and.callThrough();
      });

      it('should return early', () => {
        service.fetchGlobalStats();
        service.fetchGlobalStats();
        expect(backendSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when fetching is NOT in progress', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getCountriesLatestStats').and.callThrough();
      });

      it('should update globalStats subject', async(() => {
        service.getGlobalStatsUpdates().subscribe((updates) => {
          // exclude null update
          if (updates) {
            expect(updates?.allStats.length).toEqual(backendCountryLatestStatsDataMock.length);
            expect(service.getGlobalStatsUpdates().value?.allStats.length)
              .toEqual(backendCountryLatestStatsDataMock.length);
          }
        });
      }));
    });
  });

  describe('fetchTimelineStats', () => {
    describe('when fetching is in progress', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getTimelineStats').and.callThrough();
      });

      it('should return early', () => {
        service.fetchTimelineStats();
        service.fetchTimelineStats();
        expect(backendSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when fetching is NOT in progress', () => {
      let backendSpy: any;

      beforeEach(() => {
        backendSpy = spyOn(backend, 'getTimelineStats').and.callThrough();
      });

      it('should update timelineStats subject', async(() => {
        service.getTimelineStatsUpdates().subscribe((updates) => {
          // exclude null update
          if (updates) {
            expect(updates?.length).toEqual(backendTimelineStatsDataMock.length);
            expect(service.getTimelineStatsUpdates().value?.length)
              .toEqual(backendTimelineStatsDataMock.length);
          }
        });
      }));
    });
  });
});
