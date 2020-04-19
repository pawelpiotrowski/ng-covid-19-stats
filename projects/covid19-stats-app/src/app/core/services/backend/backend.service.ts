import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBackendCountriesLatestStatsPayload } from './backend';

/*
 * Returning full response example

public getCountriesLatestStatsResp(): Observable<HttpResponse<IBackendCountriesLatestStatsPayload>> {
  return this.httpClient.get<IBackendCountriesLatestStatsPayload>(this.apiCountriesLatestStatsUrl, { observe: 'response' });
}
*/

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly apiServer = 'https://corona-api.com';
  private readonly apiCountriesLatestStatsUrl = this.apiServer + '/countries';

  constructor(private httpClient: HttpClient) {}

  public getCountriesLatestStats(): Observable<IBackendCountriesLatestStatsPayload> {
    return this.httpClient.get<IBackendCountriesLatestStatsPayload>(this.apiCountriesLatestStatsUrl);
  }

}
