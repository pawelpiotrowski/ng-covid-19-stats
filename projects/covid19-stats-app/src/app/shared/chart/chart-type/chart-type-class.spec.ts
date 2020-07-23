import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartTypeClass } from './chart-type-class';
import { HighchartLineClass } from './highchart-line/highchart-line-class';
import { HighchartColumnClass } from './highchart-column/highchart-column-class';
import { HighchartPieClass } from './highchart-pie/highchart-pie-class';
import { HighchartMapClass } from './highchart-map/highchart-map-class';

@Component({
  template: '<div #chartDiv class="chart-div"></div>',
})
class TestChartTypeClassComponent {}

describe('ChartTypeClass', () => {
  let component: TestChartTypeClassComponent;
  let fixture: ComponentFixture<TestChartTypeClassComponent>;
  let testEl: DebugElement;
  let chartTypeClass: ChartTypeClass;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChartTypeClassComponent ],
    });
    fixture = TestBed.createComponent(TestChartTypeClassComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('div'));
    chartTypeClass = new ChartTypeClass();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(chartTypeClass).toBeTruthy();
  });

  describe('create', () => {
    describe('highchartLine', () => {
      it('should create highchart line instance', () => {
        expect(chartTypeClass.instance).toBeUndefined();
        chartTypeClass.create(
          testEl.nativeElement,
          { type: 'highchartLine', title: 'Line Chart' },
          { payload: [] },
        );
        expect(chartTypeClass.instance).toBeInstanceOf(HighchartLineClass);
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));

        expect(chartTitleElement.nativeElement.textContent).toEqual('Line Chart');
      });
    });

    describe('highchartColumn', () => {
      it('should create highchart column instance', () => {
        expect(chartTypeClass.instance).toBeUndefined();
        chartTypeClass.create(
          testEl.nativeElement,
          { type: 'highchartColumn', title: 'Column Chart' },
          { payload: [] },
        );
        expect(chartTypeClass.instance).toBeInstanceOf(HighchartColumnClass);
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));

        expect(chartTitleElement.nativeElement.textContent).toEqual('Column Chart');
      });
    });

    describe('highchartPie', () => {
      it('should create highchart pie instance', () => {
        expect(chartTypeClass.instance).toBeUndefined();
        chartTypeClass.create(
          testEl.nativeElement,
          { type: 'highchartPie', title: 'Pie Chart' },
          { payload: [] },
        );
        expect(chartTypeClass.instance).toBeInstanceOf(HighchartPieClass);
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));

        expect(chartTitleElement.nativeElement.textContent).toEqual('Pie Chart');
      });
    });

    describe('highchartMap', () => {
      it('should create highchart map instance', () => {
        expect(chartTypeClass.instance).toBeUndefined();
        chartTypeClass.create(
          testEl.nativeElement,
          { type: 'highchartMap', title: 'Map Chart' },
          { payload: [] },
        );
        expect(chartTypeClass.instance).toBeInstanceOf(HighchartMapClass);
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));

        expect(chartTitleElement.nativeElement.textContent).toEqual('Map Chart');
      });
    });

    describe('default chart type', () => {
      it('should create highchart line instance', () => {
        expect(chartTypeClass.instance).toBeUndefined();
        chartTypeClass.create(
          testEl.nativeElement,
          { title: 'Default Line Chart' } as any,
          { payload: [] },
        );
        expect(chartTypeClass.instance).toBeInstanceOf(HighchartLineClass);
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));

        expect(chartTitleElement.nativeElement.textContent).toEqual('Default Line Chart');
      });
    });
  });

  describe('setData', () => {
    it('should call setData method on chart instance', () => {
      chartTypeClass.create(
        testEl.nativeElement,
        {} as any,
        { payload: [] },
      );
      const setDataSpy = spyOn(chartTypeClass.instance, 'setData');
      const mockNewData = { payload: {} };

      chartTypeClass.setData(mockNewData);
      expect(setDataSpy).toHaveBeenCalledWith(mockNewData);
    });
  });

  describe('destroy', () => {
    describe('when instance has been created', () => {
      it('should call destroy method on chart instance', () => {
        chartTypeClass.create(
          testEl.nativeElement,
          {} as any,
          { payload: [] },
        );
        const destroySpy = spyOn(chartTypeClass.instance, 'destroy');

        chartTypeClass.destroy();
        expect(destroySpy).toHaveBeenCalled();
      });
    });

    describe('when instance has NOT been created', () => {
      it('should not attempt to destroy chart instance', () => {
        expect(() => { chartTypeClass.destroy(); }).not.toThrow();
      });
    });
  });
});
