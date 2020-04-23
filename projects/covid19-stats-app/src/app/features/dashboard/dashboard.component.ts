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

  public chartColumnOptions: IChartOptions;

  public ngxChartOptions: any;
  public ngxChartData: any;

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

    this.chartColumnOptions = { type: 'column' };
    this.setNgxChart();
  }

  private setNgxChart(): void {
    this.ngxChartOptions = {
      view: '',
      showXAxis: true,
      showYAxis: true,
      gradient: false,
      showLegend: true,
      showXAxisLabel: true,
      xAxisLabel: 'Country',
      showYAxisLabel: true,
      yAxisLabel: 'Sales',
      timeline: true,
      colorScheme: {
        domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
      },
      // showLabels: true, // pie
    };

    this.ngxChartData = {
      single: [
        {
          name: 'China',
          value: 2243772
        },
        {
          name: 'USA',
          value: 1126000
        },
        {
          name: 'Norway',
          value: 296215
        },
        {
          name: 'Japan',
          value: 257363
        },
        {
          name: 'Germany',
          value: 196750
        },
        {
          name: 'France',
          value: 204617
        }
      ],
      multi: [
        {
          name: 'China',
          series: [
            {
              name: '2018',
              value: 2243772
            },
            {
              name: '2017',
              value: 1227770
            }
          ]
        },
        {
          name: 'USA',
          series: [
            {
              name: '2018',
              value: 1126000
            },
            {
              name: '2017',
              value: 764666
            }
          ]
        },
        {
          name: 'Norway',
          series: [
            {
              name: '2018',
              value: 296215
            },
            {
              name: '2017',
              value: 209122
            }
          ]
        },
        {
          name: 'Japan',
          series: [
            {
              name: '2018',
              value: 257363
            },
            {
              name: '2017',
              value: 205350
            }
          ]
        },
        {
          name: 'Germany',
          series: [
            {
              name: '2018',
              value: 196750
            },
            {
              name: '2017',
              value: 129246
            }
          ]
        },
        {
          name: 'France',
          series: [
            {
              name: '2018',
              value: 204617
            },
            {
              name: '2017',
              value: 149797
            }
          ]
        }
      ]
    };
  }

}
