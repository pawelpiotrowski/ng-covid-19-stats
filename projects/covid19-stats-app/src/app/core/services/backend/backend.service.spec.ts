import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BackendService } from './backend.service';
import { IBackendCountriesLatestStatsPayload } from './backend';

describe('BackendService', () => {
  let injector: TestBed;
  let service: BackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService]
    });
    injector = getTestBed();
    service = injector.inject(BackendService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCountriesLatestStats', () => {
    it('should return an observable of countries stats payload', () => {
      const mockPayload: IBackendCountriesLatestStatsPayload = {
        data: [],
        _cacheHit: true,
      };

      service.getCountriesLatestStats()
        .subscribe((payload) => {
          expect(payload.data.length).toBe(0);
          expect(payload).toEqual(mockPayload);
        });

      const req = httpMock.expectOne('https://corona-api.com/countries');

      expect(req.request.method).toBe('GET');
      req.flush(mockPayload);
    });
  });
});
