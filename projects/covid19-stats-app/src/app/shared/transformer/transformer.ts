export type ITransformerType
  = 'globalStatsCards'
  | 'globalStatsProportions'
  | 'globalStatsSpread'
  | 'globalStatsHighest'
  | 'globalStatsTimeline'
;

export interface ITransformerInput {
  rawData: unknown;
}

export interface ITransformerOutput {
  data: unknown;
}
