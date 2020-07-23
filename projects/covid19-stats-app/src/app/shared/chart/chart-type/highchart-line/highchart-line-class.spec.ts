import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IChartData, IChartOptions } from '../../chart';
import { HighchartLineClass } from './highchart-line-class';

@Component({
  template: '<div #chartDiv class="chart-div"></div>',
})
class TestHighchartLineClassComponent {}

describe('HighchartLineClass', () => {
  let component: TestHighchartLineClassComponent;
  let fixture: ComponentFixture<TestHighchartLineClassComponent>;
  let testEl: DebugElement;
  let highchartLineClass: HighchartLineClass;
  const mockChartData: IChartData = {
    payload: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
    ],
  };
  const mockChartOptions: IChartOptions = { type: 'highchartLine', title: 'Line Chart' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHighchartLineClassComponent ],
    });
    fixture = TestBed.createComponent(TestHighchartLineClassComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('div'));
    highchartLineClass = new HighchartLineClass();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(highchartLineClass).toBeTruthy();
  });

  describe('create', () => {
    it('should create highchart line instance', () => {
      highchartLineClass.create(
        testEl.nativeElement,
        mockChartOptions,
        mockChartData,
      );
      const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
      const chartLegend1Element = fixture.debugElement.query(By.css('.highcharts-legend-item.highcharts-series-0 text tspan'));
      const chartLegend2Element = fixture.debugElement.query(By.css('.highcharts-legend-item.highcharts-series-1 text tspan'));

      expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartOptions.title);
      expect(chartLegend1Element.nativeElement.textContent).toEqual(mockChartData.payload[0].name);
      expect(chartLegend2Element.nativeElement.textContent).toEqual(mockChartData.payload[1].name);
    });
  });
});
