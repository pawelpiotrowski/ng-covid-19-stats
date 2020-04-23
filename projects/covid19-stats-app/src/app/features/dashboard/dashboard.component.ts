import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IStatisticCard, IStatisticCardStyleEnum } from '../../shared/statistic-card/statistic-card';
import { DataService } from '../../core/services/data/data.service';
import { IDataGlobalStats } from '../../core/services/data/data';
import { IChartOptions, IChartData } from '../../shared/chart/chart';

@Component({
  selector: 'cvd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  public globalStatsCards: IStatisticCard[];
  public chartPieData: IChartData;

  public highchartPieOptions: IChartOptions;
  public highchartColumnOptions: IChartOptions;
  public highchartMapOptions: IChartOptions;

  private destroySubscriptions$: Subject<boolean> = new Subject<boolean>();
  constructor(private data: DataService) {
    this.destroySubscriptions$ = new Subject();
  }

  ngOnInit(): void {
    this.data.getGlobalStatsUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.globalStatsUpdatesHandler.bind(this));
  }

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
    this.destroySubscriptions$.unsubscribe();
  }

  private globalStatsUpdatesHandler(data: IDataGlobalStats): void {
    if (data === null) {
      return;
    }
    const { ill, infected, deaths, recovered, allStats } = data;

    this.globalStatsCards = [
      {
        label: 'Infected',
        style: IStatisticCardStyleEnum.warn,
        value: infected
      },
      {
        label: 'Deaths',
        style: IStatisticCardStyleEnum.err,
        value: deaths
      },
      {
        label: 'Recovered',
        style: IStatisticCardStyleEnum.scs,
        value: recovered
      },
      {
        label: 'Unwell',
        style: IStatisticCardStyleEnum.neut,
        value: ill
      }
    ];

    this.chartPieData = { payload: this.globalStatsCards.slice(1) };

    // const mapData = allStats
    //   .map((stat) => {
    //     return {
    //       code: stat.code,
    //       name: stat.name,
    //       color: '#ffca28',
    //       value: stat.latest_data.confirmed
    //     };
    //   })
    //   .filter((stat) => stat.value > 0);

    this.highchartPieOptions = {
      type: 'highchartPie',
      settings: {
        dataFieldsValue: 'value',
        dataFieldsCategory: 'label',
        colorList: ['#ef5350', '#66bb6a', '#29b6f6']
      }
    };
    this.highchartColumnOptions = { type: 'highchartColumn' };
    this.highchartMapOptions = { type: 'highchartMap' };
  }

}
