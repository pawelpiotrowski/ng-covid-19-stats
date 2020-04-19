import { browser, by, element, ElementFinder } from 'protractor';

export class DashboardPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/dashboard') as Promise<unknown>;
  }

  getStatisticCards(): ElementFinder {
    return element(by.css('cvd-root cvd-dashboard cvd-statistic-card'));
  }
}
