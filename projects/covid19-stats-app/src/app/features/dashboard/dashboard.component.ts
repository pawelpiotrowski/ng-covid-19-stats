import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import maxBy from 'lodash-es/maxBy';
import range from 'lodash-es/range';

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
  public highchartLineData: IChartData;
  public highchartLineOptions: IChartOptions;
  public highchartBarData: IChartData;
  public highchartBarOptions: IChartOptions;

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

    this.highchartPieOptions = { type: 'highchartPie', title: 'Death Rate', asDonut: true };

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

    this.highchartMapOptions = { type: 'highchartMap', title: 'Spread Worldwide' };
    this.highchartMapData = { payload: mapData };

    this.highchartBarOptions = { type: 'highchartColumn', asBar: true, title: 'Worst Affected' };
    const worstAffectedCollection = new Set();

    range(5).forEach(() => {
      const collection = allStats.filter((stat) => !worstAffectedCollection.has(stat));

      worstAffectedCollection.add(maxBy(collection, 'latest_data.confirmed'));
    });

    const worstAffectedCategories = Array.from(worstAffectedCollection).map((o: any) => o.name);
    const worstAffectedDeaths = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.deaths);
    const worstAffectedRecovered = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.recovered);
    const worstAffectedInfected = Array.from(worstAffectedCollection).map((o: any) => o.latest_data.confirmed);
    const worstAffectedUnwell = worstAffectedInfected.map((wai, i) => wai - worstAffectedDeaths[i] - worstAffectedRecovered[i]);

    const payload: any = [{
      name: 'Deaths',
      data: worstAffectedDeaths,
      color: '#ef5350'
    }, {
      name: 'Recovered',
      data: worstAffectedRecovered,
      color: '#66bb6a'
    }, {
      name: 'Unwell',
      data: worstAffectedUnwell,
      color: '#29b6f6'
    }];

    this.highchartColumnOptions = {
      type: 'highchartColumn',
      categories: worstAffectedCategories,
      title: 'Worst Affected',
      asBar: true,
      stacking: 'normal'
    };
    this.highchartColumnData = { payload };

  }

  private timelineStatsUpdatesHandler(data: IDataTimelineStatsUpdate): void {
    if (data === null) {
      return;
    }

    const payloadLine: any = [{
      name: 'Infected',
      data: data.map((c: any) => c.confirmed).reverse(),
      color: '#ffca28'
    }, {
      name: 'Deaths',
      data: data.map((c: any) => c.deaths).reverse(),
      color: '#ef5350'
    }, {
      name: 'Recovered',
      data: data.map((c: any) => c.recovered).reverse(),
      color: '#66bb6a'
    }, {
      name: 'Unwell',
      data: data.map((c: any) => c.active).reverse(),
      color: '#29b6f6'
    }];

    const firstTimeLineItem = data[data.length - 1];
    const splitFirstTimeLineItemDate = firstTimeLineItem.date.split('-').map((s) => Number(s));
    const timeLineStartDate = Date.UTC(splitFirstTimeLineItemDate[0], splitFirstTimeLineItemDate[1] - 1, splitFirstTimeLineItemDate[2]);

    this.highchartLineData = { payload: payloadLine };
    this.highchartLineOptions = { type: 'highchartLine', pointStart: timeLineStartDate, title: 'Timeline' };

  }

}
