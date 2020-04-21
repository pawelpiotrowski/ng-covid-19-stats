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
  public chartPieOptions: IChartOptions;
  public chartPieData: IChartData;
  public chartMapWithBubblesOptions: IChartOptions;
  public chartMapWithBubblesData: IChartData;

  public chartColumn1Options: IChartOptions;
  public chartColumn2Options: IChartOptions;
  public chartColumn3Options: IChartOptions;

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

    this.chartPieOptions = {
      type: 'pie',
      settings: {
        dataFieldsValue: 'value',
        dataFieldsCategory: 'label',
        colorList: ['#ef5350', '#66bb6a', '#29b6f6']
      }
    };
    this.chartPieData = { payload: this.globalStatsCards.slice(1) };

    this.chartMapWithBubblesOptions = {
      type: 'mapWithBubbles',
      settings: {
        dataFieldsValue: 'value',
        dataFieldsCategory: 'code'
      },
      delayRenderMs: 4000
    };
    const mapData = allStats
      .map((stat) => {
        return {
          code: stat.code,
          name: stat.name,
          color: '#ffca28',
          value: stat.latest_data.confirmed
        };
      })
      .filter((stat) => stat.value > 0);

    this.chartMapWithBubblesData = { payload: mapData };

    this.chartColumn1Options = { type: 'column', delayRenderMs: 600 };
    this.chartColumn2Options = { type: 'column', delayRenderMs: 1600 };
    this.chartColumn3Options = { type: 'column', delayRenderMs: 3200 };
  }

}
