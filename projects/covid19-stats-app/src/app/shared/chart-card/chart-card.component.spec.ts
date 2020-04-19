import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ChartCardComponent } from './chart-card.component';
import { ChartComponent } from '../chart/chart.component';

describe('ChartCardComponent', () => {
  let component: ChartCardComponent;
  let fixture: ComponentFixture<ChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartCardComponent,
        ChartComponent,
      ],
      imports: [
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
