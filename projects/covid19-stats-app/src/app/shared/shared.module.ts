import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { ChartComponent } from './chart/chart.component';
import { ChartCardComponent } from './chart-card/chart-card.component';

@NgModule({
  declarations: [
    StatisticCardComponent,
    ChartComponent,
    ChartCardComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    StatisticCardComponent,
    ChartComponent,
    ChartCardComponent,
    NgxChartsModule
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ]
})
export class SharedModule { }
