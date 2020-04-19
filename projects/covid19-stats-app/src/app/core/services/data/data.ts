export interface IDataGlobalStats {
  deaths: number;
  ill: number;
  infected: number;
  recovered: number;
}

export type IDataGlobalStatsUpdate = IDataGlobalStats | null;

export type IDataGlobalStatsLatestProp = 'confirmed' | 'deaths' | 'recovered';
