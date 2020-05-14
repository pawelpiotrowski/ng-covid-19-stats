import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../core/services/data/data.service';
import { DataServiceMock, globalStatsUpdateDataMock } from '../../core/services/data/data.service.mock';
import { IStatisticCardStyleEnum } from '../../shared/statistic-card/statistic-card';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let data: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        SharedModule,
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    data = getTestBed().inject(DataService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let dataSpy: any;

    beforeEach(() => {
      dataSpy = spyOn(data, 'getGlobalStatsUpdates').and.callThrough();
    });

    it('should subscribe to data getGlobalStatsUpdates', () => {
      component.ngOnInit();
      expect(dataSpy).toHaveBeenCalled();
    });
  });

  describe('globalStatsUpdatesHandler', () => {
    describe('with null update', () => {
      let dataSpy: any;

      beforeEach(() => {
        dataSpy = spyOn(data, 'getGlobalStatsUpdates').and.returnValue(new BehaviorSubject(null));
      });

      it('should not populate globalStatsCards', () => {
        component.ngOnInit();
        expect(component.globalStatsCards).toBeUndefined();
      });
    });

    describe('with update', () => {
      let dataSpy: any;

      beforeEach(() => {
        dataSpy = spyOn(data, 'getGlobalStatsUpdates').and.callThrough();
      });

      it('should populate globalStatsCards', () => {
        component.ngOnInit();
        expect(component.globalStatsCards).toEqual([
          {
            label: 'Infected',
            style: IStatisticCardStyleEnum.warn,
            value: globalStatsUpdateDataMock.infected
          },
          {
            label: 'Deaths',
            style: IStatisticCardStyleEnum.err,
            value: globalStatsUpdateDataMock.deaths
          },
          {
            label: 'Recovered',
            style: IStatisticCardStyleEnum.scs,
            value: globalStatsUpdateDataMock.recovered
          },
          {
            label: 'Unwell',
            style: IStatisticCardStyleEnum.neut,
            value: globalStatsUpdateDataMock.ill
          }
        ]);
      });
    });
  });
});
