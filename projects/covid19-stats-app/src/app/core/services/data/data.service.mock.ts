import { BehaviorSubject } from 'rxjs';
import { IDataGlobalStatsUpdate, IDataTimelineStatsUpdate, IDataTimelineStats } from './data';
import mockedGlobalStats from './mocks/global-stats.json';

export const timelineStatsUpdateMock: IDataTimelineStats = [{
  active: 5554677,
  confirmed: 15040502,
  date: '2020-07-22',
  deaths: 619505,
  is_in_progress: true,
  new_confirmed: 348397,
  new_deaths: 9834,
  new_recovered: 581808,
  recovered: 8866320,
  updated_at: '2020-07-22T10:22:22.512Z',
}];

export class DataServiceMock {
  getGlobalStatsUpdates(): BehaviorSubject<IDataGlobalStatsUpdate> {
    return new BehaviorSubject({ allStats: (mockedGlobalStats.data as any) });
  }

  getTimelineStatsUpdates(): BehaviorSubject<IDataTimelineStatsUpdate> {
    return new BehaviorSubject(timelineStatsUpdateMock);
  }
}
