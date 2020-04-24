import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import groupBy from 'lodash-es/groupBy';

import { IStatisticCard, IStatisticCardStyleEnum } from '../../shared/statistic-card/statistic-card';
import { DataService } from '../../core/services/data/data.service';
import { IDataGlobalStats, IDataTimelineStatsUpdate } from '../../core/services/data/data';
import { IChartOptions, IChartData } from '../../shared/chart/chart';

@Component({
  selector: 'cvd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  public globalStatsCards: IStatisticCard[];
  public highchartPieData: IChartData;
  public highchartPieOptions: IChartOptions;
  public highchartMapData: IChartData;
  public highchartMapOptions: IChartOptions;
  public highchartColumnData: IChartData;
  public highchartColumnOptions: IChartOptions;

  private destroySubscriptions$: Subject<boolean> = new Subject<boolean>();

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.subscribeToDataUpdates();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
    this.destroySubscriptions$.unsubscribe();
  }

  private subscribeToDataUpdates(): void {
    this.data.getGlobalStatsUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.globalStatsUpdatesHandler.bind(this));

    this.data.getTimelineStatsUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.timelineStatsUpdatesHandler.bind(this));
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

    this.highchartPieOptions = { type: 'highchartPie' };

    const colorList = ['#ef5350', '#66bb6a', '#29b6f6'];
    const pieData = this.globalStatsCards.slice(1).map((s, i, all) => {
      return {
        name: s.label,
        y: (s.value * 100) / this.globalStatsCards[0].value,
        color: colorList[i]
      };
    });
    this.highchartPieData = { payload: pieData };

    const mapData = allStats
      .map((stat) => {
        return {
          code: stat.code,
          name: stat.name,
          z: stat.latest_data.confirmed
        };
      })
      .filter((stat) => stat.z > 0);

    this.highchartMapOptions = { type: 'highchartMap' };
    this.highchartMapData = { payload: mapData };
  }

  private timelineStatsUpdatesHandler(data: IDataTimelineStatsUpdate): void {
    if (data === null) {
      return;
    }

    const groupDataByCategory = groupBy(data, (o) => `${o.date.split('-')[0]}-${o.date.split('-')[1]}`);
    const categories = Object.keys(groupDataByCategory);
    const groupDataByCategoryReduced = categories.map((c) => ({
      category: c,
      infected: groupDataByCategory[c].map((i) => i.confirmed)[1],
      deaths: groupDataByCategory[c].map((i) => i.deaths)[1],
      recovered: groupDataByCategory[c].map((i) => i.recovered)[1],
      unwell: groupDataByCategory[c].map((i) => i.active)[1]
    }));

    const payload: any = [{
      name: 'Infected',
      data: groupDataByCategoryReduced.map((c: any) => c.infected),
      color: '#ffca28'
    }, {
      name: 'Deaths',
      data: groupDataByCategoryReduced.map((c: any) => c.deaths),
      color: '#ef5350'
    }, {
      name: 'Recovered',
      data: groupDataByCategoryReduced.map((c: any) => c.recovered),
      color: '#66bb6a'
    }, {
      name: 'Unwell',
      data: groupDataByCategoryReduced.map((c: any) => c.unwell),
      color: '#29b6f6'
    }];

    this.highchartColumnOptions = { categories, type: 'highchartColumn' };
    this.highchartColumnData = { payload };
  }

}
