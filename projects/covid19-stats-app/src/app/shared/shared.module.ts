import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
    ChartCardComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ]
})
export class SharedModule { }
