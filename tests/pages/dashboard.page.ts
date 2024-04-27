import { By, WebDriver, until } from "selenium-webdriver";

class DashboardPage {

    get title() { return By.xpath('//*[@title="Dashboard"]') };

    async waitUntilTitleVisible(driver: WebDriver) {
        await driver.wait(until.elementLocated(this.title), 10 * 1000, 'failed while waiting for dashboard title');
    }

}
export default new DashboardPage();