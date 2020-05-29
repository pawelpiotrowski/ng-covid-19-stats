import { BehaviorSubject } from 'rxjs';
import { IDataGlobalStats, IDataGlobalStatsUpdate, IDataTimelineStatsUpdate } from './data';

export const globalStatsUpdateDataMock: IDataGlobalStats = {
  deaths: 10,
  ill: 990,
  infected: 3000,
  recovered: 2000,
  allStats: [],
};

export class DataServiceMock {
  getGlobalStatsUpdates(): BehaviorSubject<IDataGlobalStatsUpdate> {
    return new BehaviorSubject(globalStatsUpdateDataMock);
  }

  getTimelineStatsUpdates(): BehaviorSubject<IDataTimelineStatsUpdate> {
    return new BehaviorSubject([]);
  }
}
