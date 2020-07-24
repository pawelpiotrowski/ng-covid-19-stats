import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IChartData, IChartOptions } from '../../chart';
import { HighchartColumnClass } from './highchart-column-class';

@Component({
  template: '<div #chartDiv class="chart-div"></div>',
})
class TestHighchartColumnClassComponent {}

describe('HighchartColumnClass', () => {
  let component: TestHighchartColumnClassComponent;
  let fixture: ComponentFixture<TestHighchartColumnClassComponent>;
  let testEl: DebugElement;
  let highchartColumnClass: HighchartColumnClass;
  const mockChartData: IChartData = {
    payload: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
      {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
      },
    ],
  };
  const mockChartColumnsOptions: IChartOptions = {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    type: 'highchartColumn',
    title: 'Column Chart',
  };

  const mockChartBarOptions: IChartOptions = {
    categories: mockChartColumnsOptions.categories,
    type: mockChartColumnsOptions.type,
    title: 'Bar Chart',
    asBar: true,
    stacking: 'normal',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHighchartColumnClassComponent ],
    });
    fixture = TestBed.createComponent(TestHighchartColumnClassComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('div'));
    highchartColumnClass = new HighchartColumnClass();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(highchartColumnClass).toBeTruthy();
  });

  describe('create', () => {
    describe('columns chart', () => {
      it('should create highchart column instance', () => {
        highchartColumnClass.create(
          testEl.nativeElement,
          mockChartColumnsOptions,
          mockChartData,
        );
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
        const chartXAxisLabelsElement = fixture.debugElement.query(By.css('.highcharts-axis-labels.highcharts-xaxis-labels'));

        expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartColumnsOptions.title);
        expect(chartXAxisLabelsElement.children.length).toEqual((mockChartColumnsOptions.categories as string[]).length);
      });
    });

    describe('bar chart', () => {
      it('should create highchart bar instance', () => {
        highchartColumnClass.create(
          testEl.nativeElement,
          mockChartBarOptions,
          mockChartData,
        );
        const chartTitleElement = fixture.debugElement.query(By.css('text.highcharts-title tspan'));
        const chartXAxisLabelsElement = fixture.debugElement.query(By.css('.highcharts-axis-labels.highcharts-xaxis-labels'));

        expect(chartTitleElement.nativeElement.textContent).toEqual(mockChartBarOptions.title);
        expect(chartXAxisLabelsElement.children.length).toEqual((mockChartBarOptions.categories as string[]).length);
      });
    });
  });
});
