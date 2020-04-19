import { Observable, of } from 'rxjs';

import { IBackendCountriesLatestStatsPayload } from './backend';

export class BackendMock {
  getCountriesLatestStats(): Observable<IBackendCountriesLatestStatsPayload> {
    return of({} as any);
  }
}
