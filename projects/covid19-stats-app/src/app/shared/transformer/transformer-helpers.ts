import { IBackendCountryLatestStat } from '../../core/services/backend/backend';
import { IDataGlobalStatsLatestProp } from '../../core/services/data/data';

export function reduceGlobalStatsPayloadToLatestNumberOf(
  data: IBackendCountryLatestStat[],
  numberOf: IDataGlobalStatsLatestProp
): number {
  if (!data || !data.length) {
    return -1;
  }
  return data.map((d: IBackendCountryLatestStat) => d.latest_data[numberOf])
    .reduce((a: number, b: number) => a + b);
}
