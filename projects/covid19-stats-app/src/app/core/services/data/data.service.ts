import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { BackendService } from '../backend/backend.service';
import { IDataGlobalStatsUpdate, IDataGlobalStatsLatestProp, IDataTimelineStatsUpdate } from './data';
import {
  IBackendCountriesLatestStatsPayload,
  IBackendCountryLatestStat,
  IBackendTimelinePayload
} from '../backend/backend';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private globalStats$: BehaviorSubject<IDataGlobalStatsUpdate>;
  private timelineStats$: BehaviorSubject<IDataTimelineStatsUpdate>;
  private fetchingGlobalStats = false;
  private fetchingTimelineStats = false;

  constructor(private backend: BackendService) {
    this.globalStats$ = new BehaviorSubject(null);
    this.timelineStats$ = new BehaviorSubject(null);
  }

  public getGlobalStatsUpdates(): BehaviorSubject<IDataGlobalStatsUpdate> {
    // if observable has no value make call to fetch it first
    if (this.globalStats$.value === null) {
      this.fetchGlobalStats();
    }
    return this.globalStats$;
  }

  public getTimelineStatsUpdates(): BehaviorSubject<IDataTimelineStatsUpdate> {
    // if observable has no value make call to fetch it first
    if (this.timelineStats$.value === null) {
      this.fetchTimelineStats();
    }
    return this.timelineStats$;
  }

  public fetchGlobalStats(): void {
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

  public fetchTimelineStats(): void {
    if (this.fetchingTimelineStats) {
      return;
    }
    this.fetchingTimelineStats = true;
    this.backend.getTimelineStats()
      .pipe(take(1))
      .subscribe((payload) => {
        this.fetchingTimelineStats = false;
        this.fetchTimelineStatsPayloadHandler(payload);
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

  private fetchTimelineStatsPayloadHandler({ data }: IBackendTimelinePayload): void {
    this.timelineStats$.next(data);
  }
}
