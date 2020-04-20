import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  ViewChild,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';

import { IChartArgumentsReady, IChartOptions, IChartData, IChartArgumentReadyFlag } from './chart';
import { ChartTypeClass } from './chart-type/chart-type-class';
import { IChartType } from './chart-type/chart-type';

@Component({
  selector: 'cvd-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() options: IChartOptions;
  @Input() data: IChartData;
  @ViewChild('chart') chartDiv: ElementRef;

  private chart: IChartType;
  private chartArgumentsReady: IChartArgumentsReady = { data: false, options: false, element: false };
  private isChartSet = false;

  constructor(private zone: NgZone) {}

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

  ngAfterViewInit(): void {
    this.chartArgumentReady('element');
  }

  ngOnDestroy() {
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

  private chartArgumentReady(flag: IChartArgumentReadyFlag): void {
    if (this.isChartSet) {
      return;
    }

    this.chartArgumentsReady[flag] = true;
    if (Object.values(this.chartArgumentsReady).reduce((a, b) => a && b)) {
      console.group('Set chart');
      console.log('options', this.options);
      console.log('data', this.data);
      console.log('chartDiv', this.chartDiv);
      console.groupEnd();
      this.setChart();
    }
  }

  private setChartData(): void {
    if (!this.isChartSet) {
      this.setChart();
    }
    console.group('Update chart data');
    console.log('data', this.data);
    console.groupEnd();

    this.chart.setData(this.data);
  }
}
