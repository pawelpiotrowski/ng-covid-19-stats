import { BehaviorSubject } from 'rxjs';
import { IDataGlobalStats, IDataGlobalStatsUpdate } from './data';

export const globalStatsUpdateDataMock: IDataGlobalStats = {
  deaths: 10,
  ill: 990,
  infected: 3000,
  recovered: 2000
};

export class DataServiceMock {
  getGlobalStatsUpdates(): BehaviorSubject<IDataGlobalStatsUpdate> {
    return new BehaviorSubject(globalStatsUpdateDataMock);
  }
}
