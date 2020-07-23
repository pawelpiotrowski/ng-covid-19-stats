import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStatisticCard } from '../../shared/statistic-card/statistic-card';
import { DataService } from '../../core/services/data/data.service';
import { IDataGlobalStatsUpdate, IDataTimelineStatsUpdate } from '../../core/services/data/data';
import { IChartOptions, IChartData } from '../../shared/chart/chart';
import { TransformerClass } from '../../shared/transformer/transformer-class';

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

  private globalStatsCardsTransformer: TransformerClass;
  private globalStatsProportionsTransformer: TransformerClass;
  private globalStatsSpreadTransformer: TransformerClass;
  private globalStatsHighestTransformer: TransformerClass;
  private globalStatsTimelineTransformer: TransformerClass;
  private destroySubscriptions$: Subject<boolean> = new Subject<boolean>();

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.setDataTransformers();
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

  private globalStatsUpdatesHandler(data: IDataGlobalStatsUpdate): void {
    if (data === null) {
      return;
    }

    this.globalStatsCardsTransformer.transform({ rawData: data });
    this.globalStatsProportionsTransformer.transform({ rawData: data });
    this.globalStatsSpreadTransformer.transform({ rawData: data });
    this.globalStatsHighestTransformer.transform({ rawData: data });
  }

  private timelineStatsUpdatesHandler(data: IDataTimelineStatsUpdate): void {
    if (data === null) {
      return;
    }

    this.globalStatsTimelineTransformer.transform({ rawData: data });
  }

  private setGlobalStatsCards(data: any): void {
    this.globalStatsCards = data;
  }

  private setGlobalStatsProportions(data: any): void {
    this.highchartPieOptions = { type: 'highchartPie', title: 'Death Rate', asDonut: true };
    this.highchartPieData = { payload: data };
  }

  private setGlobalStatsSpread(data: any): void {
    this.highchartMapOptions = { type: 'highchartMap', title: 'Spread Worldwide' };
    this.highchartMapData = { payload: data };
  }

  private setGlobalStatsHighest(data: any): void {
    const { categories, payload } = data;

    this.highchartColumnOptions = {
      type: 'highchartColumn',
      categories,
      title: 'Worst Affected',
      asBar: true,
      stacking: 'normal'
    };
    this.highchartColumnData = { payload };
  }

  private setGlobalStatsTimeline(data: any): void {
    const { pointStart, payload } = data;

    this.highchartLineData = { payload };
    this.highchartLineOptions = { type: 'highchartLine', pointStart, title: 'Timeline' };
  }

  private setDataTransformers(): void {
    this.globalStatsCardsTransformer = new TransformerClass('globalStatsCards');
    this.globalStatsCardsTransformer.getTransformUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.setGlobalStatsCards.bind(this));

    this.globalStatsProportionsTransformer = new TransformerClass('globalStatsProportions');
    this.globalStatsProportionsTransformer.getTransformUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.setGlobalStatsProportions.bind(this));

    this.globalStatsSpreadTransformer = new TransformerClass('globalStatsSpread');
    this.globalStatsSpreadTransformer.getTransformUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.setGlobalStatsSpread.bind(this));

    this.globalStatsHighestTransformer = new TransformerClass('globalStatsHighest');
    this.globalStatsHighestTransformer.getTransformUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.setGlobalStatsHighest.bind(this));

    this.globalStatsTimelineTransformer = new TransformerClass('globalStatsTimeline');
    this.globalStatsTimelineTransformer.getTransformUpdates()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(this.setGlobalStatsTimeline.bind(this));
  }

}
