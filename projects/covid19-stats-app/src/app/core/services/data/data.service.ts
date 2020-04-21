import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { BackendService } from '../backend/backend.service';
import { IDataGlobalStatsUpdate, IDataGlobalStatsLatestProp } from './data';
import {
  IBackendCountriesLatestStatsPayload,
  IBackendCountryLatestStat
} from '../backend/backend';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private globalStats$: BehaviorSubject<IDataGlobalStatsUpdate>;
  private fetchingGlobalStats = false;

  constructor(private backend: BackendService) {
    this.globalStats$ = new BehaviorSubject(null);
  }

  public getGlobalStatsUpdates(): BehaviorSubject<IDataGlobalStatsUpdate> {
    // if observable has no value make call to fetch it first
    if (this.globalStats$.value === null) {
      this.fetchGlobalStats();
    }
    return this.globalStats$;
  }

  private fetchGlobalStats(): void {
    if (this.fetchingGlobalStats) {
      return;
    }
    this.fetchingGlobalStats = true;
    this.backend.getCountriesLatestStats()
      .pipe(take(1))
      .subscribe((payload) => {
        this.fetchingGlobalStats = false;
        this.fetchGlobalStatsPayloadHandler(payload);
      });
  }

  private fetchGlobalStatsPayloadHandler(payload: IBackendCountriesLatestStatsPayload): void {
    const deaths = this.reduceGlobalStatsPayloadToLatestNumberOf(payload, 'deaths');
    const infected = this.reduceGlobalStatsPayloadToLatestNumberOf(payload, 'confirmed');
    const recovered = this.reduceGlobalStatsPayloadToLatestNumberOf(payload, 'recovered');
    const ill = infected - deaths - recovered;
    const allStats = payload.data;

    this.globalStats$.next({ deaths, infected, recovered, ill, allStats });
  }

  private reduceGlobalStatsPayloadToLatestNumberOf(
    payload: IBackendCountriesLatestStatsPayload,
    numberOf: IDataGlobalStatsLatestProp
  ): number {
    return payload.data.map((d: IBackendCountryLatestStat) => d.latest_data[numberOf])
      .reduce((a: number, b: number) => a + b);
  }
}
