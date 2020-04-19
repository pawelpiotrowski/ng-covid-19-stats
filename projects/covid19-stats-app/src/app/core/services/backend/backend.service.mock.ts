import { Observable, of } from 'rxjs';

import { IBackendCountriesLatestStatsPayload } from './backend';

export class BackendServiceMock {
  getCountriesLatestStats(): Observable<IBackendCountriesLatestStatsPayload> {
    return of({} as any);
  }
}
