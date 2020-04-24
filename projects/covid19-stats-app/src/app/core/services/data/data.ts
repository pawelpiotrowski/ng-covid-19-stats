import { IBackendCountryLatestStat, IBackendTimelineItem } from '../backend/backend';

export interface IDataGlobalStats {
  deaths: number;
  ill: number;
  infected: number;
  recovered: number;
  allStats: IBackendCountryLatestStat[];
}

export type IDataGlobalStatsUpdate = IDataGlobalStats | null;

export type IDataGlobalStatsLatestProp = 'confirmed' | 'deaths' | 'recovered';

export type IDataTimelineStats = IBackendTimelineItem[];

export type IDataTimelineStatsUpdate = IDataTimelineStats | null;
