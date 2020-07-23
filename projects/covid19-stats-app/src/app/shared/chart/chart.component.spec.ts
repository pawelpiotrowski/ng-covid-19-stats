import { async, ComponentFixture, discardPeriodicTasks, flush, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ MatProgressSpinnerModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // tslint:disable: no-string-literal
  describe('ngOnChanges', () => {
    describe('when changes are empty', () => {
      beforeEach(() => {
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
      });

      it('should not set any of chart argument ready to true', () => {
        expect(component['chartArgumentsReady']).toEqual({ data: false, options: false, element: false });
      });
    });

    describe('when changes have options', () => {
      beforeEach(() => {
        component.options = { type: 'highchartLine' };
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: component.options,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
      });

      it('should set chart argument ready options to true', () => {
        expect(component['chartArgumentsReady']).toEqual({ data: false, options: true, element: false });
      });
    });

    describe('when changes have data', () => {
      beforeEach(() => {
        component.data = { payload: [] };
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
      });

      it('should set chart argument ready data to true', () => {
        expect(component['chartArgumentsReady']).toEqual({ data: true, options: false, element: false });
      });
    });

    describe('when changes have both data and options', () => {
      beforeEach(() => {
        component.data = { payload: [] };
        component.options = { type: 'highchartColumn' };
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: component.options,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
      });

      it('should set chart argument ready data and options to true', () => {
        expect(component['chartArgumentsReady']).toEqual({ data: true, options: true, element: false });
      });
    });
  });

  describe('ngOnInit', () => {
    it('should bind to window resize event', () => {
      const resizeSpy = spyOn(component as any, 'resizeHandler');

      fixture.detectChanges();
      window.dispatchEvent(new Event('resize'));
      expect(resizeSpy).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('should set chart argument element to true', fakeAsync(() => {
      fixture.detectChanges();
      component.ngAfterViewInit();
      tick();
      expect(component['chartArgumentsReady']).toEqual({ data: false, options: false, element: true });
    }));
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      component.data = { payload: [] };
      component.options = { type: 'highchartMap' };
    });

    it('should destroy all subscriptions and set isChartSet flag to false', fakeAsync(() => {
      const destroySubscriptionsNextSpy = spyOn(component['destroySubscriptions$'], 'next');
      const destroySubscriptionsUnsubscribeSpy = spyOn(component['destroySubscriptions$'], 'unsubscribe');

      fixture.detectChanges();
      component.ngOnChanges({
        data: {
          currentValue: component.data,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: undefined,
        },
        options: {
          currentValue: component.options,
          firstChange: false,
          isFirstChange: () => false,
          previousValue: undefined,
        }
      });
      component.ngAfterViewInit();
      tick(1000);

      const destroyChartSpy = spyOn(component['chart'], 'destroy');

      component.ngOnDestroy();
      expect(destroySubscriptionsNextSpy).toHaveBeenCalledWith(true);
      expect(destroySubscriptionsUnsubscribeSpy).toHaveBeenCalled();
      expect(destroyChartSpy).toHaveBeenCalled();
      expect(component.isChartSet).toEqual(false);
    }));
  });

  describe('creating Chart', () => {
    describe('when chart is not already set', () => {
      beforeEach(() => {
        component.data = { payload: [] };
        component.options = { type: 'highchartPie' };
      });

      it('should create the chart and set isChartSet flag to true', fakeAsync(() => {
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: component.options,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
        component.ngAfterViewInit();
        tick(1000);
        expect(component['chartArgumentsReady']).toEqual({ data: true, options: true, element: true });
        expect(component.isChartSet).toEqual(true);
      }));
    });

    describe('when chart is set', () => {
      beforeEach(() => {
        component.data = { payload: [] };
        component.options = { type: 'highchartPie' };
      });

      it('should not attempt to create a chart just set chart data', fakeAsync(() => {
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: component.options,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
        component.ngAfterViewInit();
        tick(1000);
        const chartCreateSpy = spyOn(component['chart'], 'create');
        const chartSetDataSpy = spyOn(component['chart'], 'setData');

        component.data = { payload: [1, 2, 3, 4] };
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: { payload: [] },
          }
        });
        expect(chartCreateSpy).not.toHaveBeenCalled();
        expect(chartSetDataSpy).toHaveBeenCalled();
      }));
    });
  });

  describe('onDataChangesHandler', () => {
    describe('when changes are nil', () => {
      it('should do nothing', () => {
        const setChartDataSpy = spyOn(component as any, 'setChartData');
        const chartArgumentReadySpy = spyOn(component as any, 'chartArgumentReady');

        fixture.detectChanges();
        component['onDataChangesHandler'](undefined as any);
        expect(setChartDataSpy).not.toHaveBeenCalled();
        expect(chartArgumentReadySpy).not.toHaveBeenCalled();
      });
    });

    describe('when changes are NOT nil', () => {
      describe('when chart is set and data change is an object', () => {
        it('should only set chart data', () => {
          const setChartDataSpy = spyOn(component as any, 'setChartData');
          const chartArgumentReadySpy = spyOn(component as any, 'chartArgumentReady');

          // here faking chart created
          component.isChartSet = true;
          component.options = { type: 'highchartColumn' };
          fixture.detectChanges();
          component['onDataChangesHandler']({
            currentValue: { payload: [] },
            previousValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
          });
          expect(setChartDataSpy).toHaveBeenCalled();
          expect(chartArgumentReadySpy).not.toHaveBeenCalled();
          // switch back to avoid on destroy errors
          component.isChartSet = false;
        });
      });

      describe('when chart is NOT set data change is an object and previous data is nil', () => {
        it('should only set chart argument ready data', () => {
          const setChartDataSpy = spyOn(component as any, 'setChartData');
          const chartArgumentReadySpy = spyOn(component as any, 'chartArgumentReady');

          component.options = { type: 'highchartMap' };
          fixture.detectChanges();
          component['onDataChangesHandler']({
            currentValue: { payload: [] },
            previousValue: undefined,
            firstChange: false,
            isFirstChange: () => false,
          });
          expect(setChartDataSpy).not.toHaveBeenCalled();
          expect(chartArgumentReadySpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('setChart', () => {
    beforeEach(() => {
      component.data = { payload: [] };
      component.options = { type: 'highchartLine' };
    });

    describe('when chart is not set', () => {
      it('should create chart and set isChartSet flag to true', () => {
        fixture.detectChanges();
        component['setChart']();
        expect(component['chart']).toBeDefined();
        expect(component.isChartSet).toEqual(true);
      });
    });

    describe('when chart is already set', () => {
      it('should not attempt to create a chart', () => {
        fixture.detectChanges();
        component['setChart']();
        const chartCreateSpy = spyOn(component['chart'], 'create');

        component['setChart']();
        expect(chartCreateSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('setChartData', () => {
    beforeEach(() => {
      component.data = { payload: [] };
      component.options = { type: 'highchartColumn' };
    });

    describe('when chart is not set', () => {
      it('should set a chart', () => {
        const setChartSpy = spyOn(component as any, 'setChart');

        // faking chart creation
        component['chart'] = {
          setData: () => true,
        } as any;
        fixture.detectChanges();
        component['setChartData']();
        expect(setChartSpy).toHaveBeenCalled();
        // clean up fake chart
        component['chart'] = undefined as any;
      });
    });

    describe('when chart is already set', () => {
      it('should set chart data', fakeAsync(() => {
        fixture.detectChanges();
        component.ngOnChanges({
          data: {
            currentValue: component.data,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          },
          options: {
            currentValue: component.options,
            firstChange: false,
            isFirstChange: () => false,
            previousValue: undefined,
          }
        });
        component.ngAfterViewInit();
        tick(1000);
        const chartCreateSpy = spyOn(component['chart'], 'create');
        const chartSetDataSpy = spyOn(component['chart'], 'setData');

        component['setChartData']();
        expect(chartCreateSpy).not.toHaveBeenCalled();
        expect(chartSetDataSpy).toHaveBeenCalledWith(component.data);
      }));
    });
  });

  describe('resizeHandler', () => {
    it('should destroy and then set chart again', () => {
      const destroyChartSpy = spyOn(component as any, 'destroyChart');
      const setChartSpy = spyOn(component as any, 'setChart');

      fixture.detectChanges();
      component['resizeHandler']();
      expect(destroyChartSpy).toHaveBeenCalled();
      expect(setChartSpy).toHaveBeenCalled();
    });
  });
});
