import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IStatisticCard, IStatisticCardStyle, IStatisticCardStyleMap } from './statistic-card';

@Component({
  selector: 'cvd-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent implements OnChanges {
  @Input() stat: IStatisticCard;

  public label: string;
  public value: number;
  public icon: string;
  public colorClass: string;
  private readonly styleMap: IStatisticCardStyleMap = {
    warning: {
      icon: 'warning',
      class: 'app-text--warn'
    },
    success: {
      icon: 'sentiment_satisfied',
      class: 'app-text--scs'
    },
    error: {
      icon: 'error',
      class: 'app-text--err'
    },
    neutral: {
      icon: 'sentiment_dissatisfied',
      class: 'app-text--neut'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stat && changes.stat.currentValue) {
      this.setStat();
    }
  }

  private setStat(): void {
    const { label, style, value } = this.stat;
    const styleMapRef = this.styleMap[style as IStatisticCardStyle];

    this.label = label;
    this.value = value;
    this.icon = styleMapRef.icon;
    this.colorClass = styleMapRef.class;
  }

}
