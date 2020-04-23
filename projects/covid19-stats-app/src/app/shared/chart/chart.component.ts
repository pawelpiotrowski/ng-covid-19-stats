import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  ViewChild,
  SimpleChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';
import { asapScheduler, fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

import { IChartArgumentsReady, IChartOptions, IChartData, IChartArgumentReadyFlag } from './chart';
import { ChartTypeClass } from './chart-type/chart-type-class';
import { IChartType } from './chart-type/chart-type';

@Component({
  selector: 'cvd-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @Input() options: IChartOptions;
  @Input() data: IChartData;
  @ViewChild('chartDiv') chartDiv: ElementRef;
  public isChartSet = false;
  private chart: IChartType;
  private chartArgumentsReady: IChartArgumentsReady;
  private destroySubscriptions$: Subject<boolean> = new Subject<boolean>();

  constructor(private zone: NgZone) {
    this.chartArgumentsReady = { data: false, options: false, element: false };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue: optionsCurrentValue, previousValue: optionsPreviousValue } = changes.options;
    const { currentValue: dataCurrentValue, previousValue: dataPreviousValue } = changes.data;

    // this is data update
    if (this.isChartSet && isObject(dataCurrentValue)) {
      this.setChartData();
      return;
    }
    // this is initial load collecting chart arguments
    if (isNil(optionsPreviousValue) && isObject(optionsCurrentValue) && !this.isChartSet) {
      this.chartArgumentReady('options');
    }
    if (isNil(dataPreviousValue) && isObject(dataCurrentValue) && !this.isChartSet) {
      this.chartArgumentReady('data');
    }
  }

  ngOnInit(): void {
    fromEvent(window, 'resize').pipe(throttleTime(200), takeUntil(this.destroySubscriptions$))
      .subscribe(this.resizeHandler.bind(this));
  }

  ngAfterViewInit(): void {
    asapScheduler.schedule(() => { // https://blog.angular-university.io/angular-debugging/
      this.chartArgumentReady('element');
    });
  }

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
    this.destroySubscriptions$.unsubscribe();

    if (!this.isChartSet) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.chart.destroy();
    });
  }

  private setChart(): void {
    if (this.isChartSet) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.chart = new ChartTypeClass();
      this.chart.create(this.chartDiv.nativeElement as HTMLElement, this.options, this.data);
    });
    this.isChartSet = true;
  }

  private setChartData(): void {
    if (!this.isChartSet) {
      this.setChart();
    }
    this.chart.setData(this.data);
  }

  private chartArgumentReady(flag: IChartArgumentReadyFlag): void {
    if (this.isChartSet) {
      return;
    }

    this.chartArgumentsReady[flag] = true;
    if (Object.values(this.chartArgumentsReady).reduce((a, b) => a && b)) {
      this.setChart();
    }
  }

  private resizeHandler(): void {
    this.chart.destroy();
    this.isChartSet = false;
    this.setChart();
  }

}
