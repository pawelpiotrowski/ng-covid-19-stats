import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import mockedGlobalStats from '../../../../core/services/data/mocks/global-stats.json';
import { IChartData, IChartOptions } from '../../chart';
import { HighchartMapClass } from './highchart-map-class';

@Component({
  template: '<div #chartDiv class="chart-div"></div>',
})
class TestHighchartMapClassComponent {}

describe('HighchartMapClass', () => {
  let component: TestHighchartMapClassComponent;
  let fixture: ComponentFixture<TestHighchartMapClassComponent>;
  let testEl: DebugElement;
  let highchartMapClass: HighchartMapClass;

  const mockChartMapOptions: IChartOptions = { type: 'highchartMap', title: 'Map Chart' };
  const mockChartMapData: IChartData = { payload: mockedGlobalStats.data };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHighchartMapClassComponent ],
    });
    fixture = TestBed.createComponent(TestHighchartMapClassComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('div'));
    highchartMapClass = new HighchartMapClass();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(highchartMapClass).toBeTruthy();
  });

  describe('create', () => {
    it('should create highchart map instance', () => {
      highchartMapClass.create(
        testEl.nativeElement,
        mockChartMapOptions,
        mockChartMapData,
      );
      const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
      const chartMapSeriesElement = fixture.debugElement.query(By.css('.highcharts-map-series'));
      const chartMapNavigationElement = fixture.debugElement.query(By.css('.highcharts-map-navigation'));

      expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartMapOptions.title);
      expect(chartMapSeriesElement.nativeElement).toBeDefined();
      expect(chartMapNavigationElement.nativeElement).toBeDefined();
    });
  });

  describe('destroy', () => {
    it('should destroy chart', () => {
      highchartMapClass.create(
        testEl.nativeElement,
        mockChartMapOptions,
        mockChartMapData,
      );
      const destroyChartSpy = spyOn(highchartMapClass.chart, 'destroy');

      highchartMapClass.destroy();
      expect(destroyChartSpy).toHaveBeenCalled();
    });
  });
});
