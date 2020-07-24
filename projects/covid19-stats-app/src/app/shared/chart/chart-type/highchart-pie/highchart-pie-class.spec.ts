import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IChartData, IChartOptions } from '../../chart';
import { HighchartPieClass } from './highchart-pie-class';

@Component({
  template: '<div #chartDiv class="chart-div"></div>',
})
class TestHighchartPieClassComponent {}

describe('HighchartPieClass', () => {
  let component: TestHighchartPieClassComponent;
  let fixture: ComponentFixture<TestHighchartPieClassComponent>;
  let testEl: DebugElement;
  let highchartPieClass: HighchartPieClass;
  const mockChartPieOptions: IChartOptions = { type: 'highchartPie', title: 'Pie Chart' };
  const mockChartDonutOptions: IChartOptions = { type: 'highchartPie', title: 'Donut Chart', asDonut: true };
  const mockChartData: IChartData = {
    payload: [
      {
        name: 'Chrome',
        y: 60,
      },
      {
        name: 'Internet Explorer',
        y: 30,
      },
      {
        name: 'Firefox',
        y: 10,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHighchartPieClassComponent ],
    });
    fixture = TestBed.createComponent(TestHighchartPieClassComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('div'));
    highchartPieClass = new HighchartPieClass();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(highchartPieClass).toBeTruthy();
  });

  describe('create', () => {
    describe('pie chart', () => {
      it('should create highchart pie instance', () => {
        highchartPieClass.create(
          testEl.nativeElement,
          mockChartPieOptions,
          mockChartData,
        );
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
        const chartPieSeriesElement = fixture.debugElement.query(By.css('.highcharts-series.highcharts-pie-series'));
        const chartPieLabelsElement = fixture.debugElement.query(By.css('.highcharts-data-labels.highcharts-pie-series'));
        const chartPieLabelElements = chartPieLabelsElement.queryAll(By.css('.highcharts-label.highcharts-data-label'));

        expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartPieOptions.title);
        expect(chartPieSeriesElement.nativeElement).toBeDefined();
        expect(chartPieLabelElements.length).toEqual(mockChartData.payload.length);
      });
    });

    describe('donut chart', () => {
      it('should create highchart donut instance', () => {
        highchartPieClass.create(
          testEl.nativeElement,
          mockChartDonutOptions,
          mockChartData,
        );
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
        const chartPieSeriesElement = fixture.debugElement.query(By.css('.highcharts-series.highcharts-pie-series'));
        const chartPieLabelsElement = fixture.debugElement.query(By.css('.highcharts-data-labels.highcharts-pie-series'));
        const chartPieLabelElements = chartPieLabelsElement.queryAll(By.css('.highcharts-label.highcharts-data-label'));

        expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartDonutOptions.title);
        expect(chartPieSeriesElement.nativeElement).toBeDefined();
        expect(chartPieLabelElements.length).toEqual(mockChartData.payload.length);
      });
    });
  });

  describe('legendItemClick', () => {
    it('should be disabled by having function returning false value', () => {
      highchartPieClass.create(
        testEl.nativeElement,
        mockChartPieOptions,
        mockChartData,
      );
      const expectedClickHandler: any = highchartPieClass.chart.userOptions.plotOptions?.series?.point?.events?.legendItemClick;

      expect(expectedClickHandler()).toEqual(false);
    });
  });

  describe('formatLabel', () => {
    it('should return string containing name and rounded value', () => {
      highchartPieClass.create(
        testEl.nativeElement,
        mockChartPieOptions,
        mockChartData,
      );
      // tslint:disable-next-line: no-string-literal
      const formatLabelTest1 = highchartPieClass['formatLabel']('test1', 123.44);
      // tslint:disable-next-line: no-string-literal
      const formatLabelTest2 = highchartPieClass['formatLabel']('test2', 60);
      // tslint:disable-next-line: no-string-literal
      const formatLabelTest3 = highchartPieClass['formatLabel']('test3', 1.9999);

      expect(formatLabelTest1).toEqual('test1 123.4%');
      expect(formatLabelTest2).toEqual('test2 60%');
      expect(formatLabelTest3).toEqual('test3 2%');
    });
  });
});
