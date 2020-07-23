import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../core/services/data/data.service';
import { DataServiceMock } from '../../core/services/data/data.service.mock';

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
    let globalStatsDataSpy: any;
    let timelineStatsDataSpy: any;

    beforeEach(() => {
      globalStatsDataSpy = spyOn(data, 'getGlobalStatsUpdates').and.callThrough();
      timelineStatsDataSpy = spyOn(data, 'getTimelineStatsUpdates').and.callThrough();
      component.ngOnInit();
    });

    it('should subscribe to globalStats updates', () => {
      expect(globalStatsDataSpy).toHaveBeenCalled();
    });

    it('should subscribe to timelineStats updates', () => {
      expect(timelineStatsDataSpy).toHaveBeenCalled();
    });

    it('should set globalStatsCards data', (done: any) => {
      // tslint:disable-next-line: no-string-literal
      component['globalStatsCardsTransformer'].getTransformUpdates()
        .subscribe((update: any) => {
          expect(component.globalStatsCards).toEqual(update);
          done();
        });
    });

    it('should set highchart pie options and data', (done: any) => {
      // tslint:disable-next-line: no-string-literal
      component['globalStatsProportionsTransformer'].getTransformUpdates()
        .subscribe((update: any) => {
          expect(component.highchartPieOptions).toEqual({ type: 'highchartPie', title: 'Death Rate', asDonut: true });
          expect(component.highchartPieData).toEqual({ payload: update });
          done();
        });
    });

    it('should set highchart map options and data', (done: any) => {
      // tslint:disable-next-line: no-string-literal
      component['globalStatsSpreadTransformer'].getTransformUpdates()
        .subscribe((update: any) => {
          expect(component.highchartMapOptions).toEqual({ type: 'highchartMap', title: 'Spread Worldwide' });
          expect(component.highchartMapData).toEqual({ payload: update });
          done();
        });
    });

    it('should set highchart column options and data', (done: any) => {
      // tslint:disable-next-line: no-string-literal
      component['globalStatsHighestTransformer'].getTransformUpdates()
        .subscribe((update: any) => {
          const { categories, payload } = update;

          expect(component.highchartColumnOptions).toEqual({
            type: 'highchartColumn',
            categories,
            title: 'Worst Affected',
            asBar: true,
            stacking: 'normal'
          });
          expect(component.highchartColumnData).toEqual({ payload });
          done();
        });
    });

    it('should set highchart line options and data', (done: any) => {
      // tslint:disable-next-line: no-string-literal
      component['globalStatsTimelineTransformer'].getTransformUpdates()
        .subscribe((update: any) => {
          const { pointStart, payload } = update;

          expect(component.highchartLineOptions).toEqual({ type: 'highchartLine', pointStart, title: 'Timeline' });
          expect(component.highchartLineData).toEqual({ payload });
          done();
        });
    });
  });

  describe('globalStatsUpdatesHandler', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('when updates is not null', () => {
      let globalStatsCardsTransformerSpy: any;
      let globalStatsProportionsTransformerSpy: any;
      let globalStatsSpreadTransformerSpy: any;
      let globalStatsHighestTransformerSpy: any;

      beforeEach(() => {
        // tslint:disable-next-line: no-string-literal
        globalStatsCardsTransformerSpy = spyOn(component['globalStatsCardsTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsProportionsTransformerSpy = spyOn(component['globalStatsProportionsTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsSpreadTransformerSpy = spyOn(component['globalStatsSpreadTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsHighestTransformerSpy = spyOn(component['globalStatsHighestTransformer'], 'transform');
      });

      it('should attempt to transform raw data', () => {
        // tslint:disable-next-line: no-string-literal
        component['globalStatsUpdatesHandler']({
          allStats: [],
        });
        expect(globalStatsCardsTransformerSpy).toHaveBeenCalled();
        expect(globalStatsProportionsTransformerSpy).toHaveBeenCalled();
        expect(globalStatsSpreadTransformerSpy).toHaveBeenCalled();
        expect(globalStatsHighestTransformerSpy).toHaveBeenCalled();
      });
    });

    describe('when updates is null', () => {
      let globalStatsCardsTransformerSpy: any;
      let globalStatsProportionsTransformerSpy: any;
      let globalStatsSpreadTransformerSpy: any;
      let globalStatsHighestTransformerSpy: any;

      beforeEach(() => {
        // tslint:disable-next-line: no-string-literal
        globalStatsCardsTransformerSpy = spyOn(component['globalStatsCardsTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsProportionsTransformerSpy = spyOn(component['globalStatsProportionsTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsSpreadTransformerSpy = spyOn(component['globalStatsSpreadTransformer'], 'transform');
        // tslint:disable-next-line: no-string-literal
        globalStatsHighestTransformerSpy = spyOn(component['globalStatsHighestTransformer'], 'transform');
      });

      it('should attempt to transform raw data', () => {
        // tslint:disable-next-line: no-string-literal
        component['globalStatsUpdatesHandler'](null);
        expect(globalStatsCardsTransformerSpy).not.toHaveBeenCalled();
        expect(globalStatsProportionsTransformerSpy).not.toHaveBeenCalled();
        expect(globalStatsSpreadTransformerSpy).not.toHaveBeenCalled();
        expect(globalStatsHighestTransformerSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('timelineStatsUpdatesHandler', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('when updates is not null', () => {
      let timelineStatsTransformerSpy: any;

      beforeEach(() => {
        // tslint:disable-next-line: no-string-literal
        timelineStatsTransformerSpy = spyOn(component['globalStatsTimelineTransformer'], 'transform');
      });

      it('should attempt to transform raw data', () => {
        // tslint:disable-next-line: no-string-literal
        component['timelineStatsUpdatesHandler']([]);
        expect(timelineStatsTransformerSpy).toHaveBeenCalled();
      });
    });

    describe('when updates is null', () => {
      let timelineStatsTransformerSpy: any;

      beforeEach(() => {
        // tslint:disable-next-line: no-string-literal
        timelineStatsTransformerSpy = spyOn(component['globalStatsTimelineTransformer'], 'transform');
      });

      it('should not attempt to transform raw data', () => {
        // tslint:disable-next-line: no-string-literal
        component['timelineStatsUpdatesHandler'](null);
        expect(timelineStatsTransformerSpy).not.toHaveBeenCalled();
      });
    });
  });
});
