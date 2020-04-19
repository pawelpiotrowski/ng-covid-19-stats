export enum IStatisticCardStyleEnum {
  warn = 'warning',
  scs = 'success',
  err = 'error',
  neut = 'neutral'
}

export type IStatisticCardStyle = IStatisticCardStyleEnum.warn
  | IStatisticCardStyleEnum.scs
  | IStatisticCardStyleEnum.err
  | IStatisticCardStyleEnum.neut;

export interface IStatisticCard {
  label: string;
  style: IStatisticCardStyle;
  value: number;
}

export interface IStatisticCardStyleMapProp {
  class: string;
  icon: string;
}

export type IStatisticCardStyleMap = {
  [key in IStatisticCardStyle]: IStatisticCardStyleMapProp;
};
