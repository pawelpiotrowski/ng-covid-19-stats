import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { StatisticCardComponent } from './statistic-card/statistic-card.component';

@NgModule({
  declarations: [
    StatisticCardComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    StatisticCardComponent
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
