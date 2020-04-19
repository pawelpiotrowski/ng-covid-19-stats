export interface IBackendCountryLatestStatData {
  calculated: {
    cases_per_million_population: number;
    death_rate: number;
    recovered_vs_death_ratio: string | number;
    recovery_rate: number;
  };
  confirmed: number;
  critical: number;
  deaths: number;
  recovered: number;
}

export interface IBackendCountryLatestStat {
  code: string;
  coordinates: { latitude: number, longitude: number };
  latest_data: IBackendCountryLatestStatData;
  name: string;
  population: number;
  updated_at: string;
}


export interface IBackendCountriesLatestStatsPayload {
  data: IBackendCountryLatestStat[];
  _cacheHit: boolean;
}
