import { Component, OnInit } from '@angular/core';

import { IStatisticCard, IStatisticCardStyleEnum } from '../../shared/statistic-card/statistic-card';

@Component({
  selector: 'cvd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public stats: IStatisticCard[];
  constructor() { }

  ngOnInit(): void {
    this.stats = [
      {
        label: 'Infected',
        style: IStatisticCardStyleEnum.warn,
        value: 100000
      },
      {
        label: 'Deaths',
        style: IStatisticCardStyleEnum.err,
        value: 1000
      },
      {
        label: 'Recovered',
        style: IStatisticCardStyleEnum.scs,
        value: 35000
      },
      {
        label: 'Hospitalised',
        style: IStatisticCardStyleEnum.neut,
        value: 64000
      }
    ];
  }

}
