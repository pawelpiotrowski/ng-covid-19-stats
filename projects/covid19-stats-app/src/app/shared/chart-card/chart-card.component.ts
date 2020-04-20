import { Component, Input } from '@angular/core';

import { IChartOptions, IChartData } from '../chart/chart';

@Component({
  selector: 'cvd-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent {
  @Input() title: string;
  @Input() chartOptions: IChartOptions;
  @Input() chartData: IChartData;
}
