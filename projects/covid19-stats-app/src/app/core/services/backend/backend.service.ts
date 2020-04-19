import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly apiServer = 'https://corona-api.com';
  private readonly apiCountriesLatestStatsUrl = this.apiServer + '/countries';

  constructor(private httpClient: HttpClient) {}

  public getCountriesLatestStats(): Observable<any> {
    return this.httpClient.get(this.apiCountriesLatestStatsUrl);
  }
}
