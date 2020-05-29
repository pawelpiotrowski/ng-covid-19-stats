import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { StatisticCardComponent } from './statistic-card.component';
import { IStatisticCardStyleEnum } from './statistic-card';

describe('StatisticCardComponent', () => {
  let component: StatisticCardComponent;
  let fixture: ComponentFixture<StatisticCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCardComponent ],
      imports: [
        MatCardModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnChanges', () => {
  //   beforeEach(() => {
  //     const mockInput = {
  //       label: 'Foo',
  //       style: IStatisticCardStyleEnum.warn,
  //       value: 1
  //     };

  //     component.stat = mockInput;
  //     component.ngOnChanges({
  //       stat: {
  //         currentValue: mockInput
  //       }
  //     } as any);
  //   });

  //   it('should set stat label value and icon and color class', () => {
  //     expect(component.label).toEqual('Foo');
  //     expect(component.value).toEqual(1);
  //     expect(component.icon).toEqual('warning');
  //     expect(component.colorClass).toEqual('app-text--warn');
  //   });
  // });
});
