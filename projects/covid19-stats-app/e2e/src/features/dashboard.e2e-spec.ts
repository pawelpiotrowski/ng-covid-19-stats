import { DashboardPage } from './dashboard.po';
import { browser, logging } from 'protractor';

describe('workspace-project Feature Dashboard', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display statistic cards', () => {
    page.navigateTo();
    expect(page.getStatisticCards().isDisplayed()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
