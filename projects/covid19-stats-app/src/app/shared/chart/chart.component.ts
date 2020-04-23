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
import isNumber from 'lodash-es/isNumber';
import debounce from 'lodash-es/debounce';

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
  public isChartSet = false;
  private chart: IChartType;
  private chartArgumentsReady: IChartArgumentsReady;
  private delayTimer: number;
  private siki: any;

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

  ngAfterViewInit(): void {
    setTimeout(() => { // https://blog.angular-university.io/angular-debugging/
      this.chartArgumentReady('element');
      // this.siki = window.addEventListener('resize', debounce(() => {
      //   console.log('RESIZE!!!!');
      //   // this.chart.instance.chart.resize();
      //   this.chart.destroy();
      //   this.isChartSet = false;
      //   this.setChart();
      // }, 200));
    });
  }

  ngOnDestroy() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }
    if (!this.isChartSet) {
      return;
    }
    // window.removeEventListener('resize', this.siki);
    this.zone.runOutsideAngular(() => {
      // this.chart.destroy();
    });
  }

  private setChart(): void {
    if (this.isChartSet) {
      return;
    }
    const setChart = () => {
      this.zone.runOutsideAngular(() => {
        this.chart = new ChartTypeClass();
        this.chart.create(this.chartDiv.nativeElement as HTMLElement, this.options, this.data);
      });
      this.isChartSet = true;
    };

    if (isNumber(this.options.delayRenderMs)) {
      this.delayTimer = window.setTimeout(setChart, this.options.delayRenderMs);
      return;
    }
    setChart();
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

}
