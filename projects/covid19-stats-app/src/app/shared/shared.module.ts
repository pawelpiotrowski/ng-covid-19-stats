import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    RouterModule,
    StatisticCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ]
})
export class SharedModule { }
