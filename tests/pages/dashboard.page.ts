import { By, WebDriver, until } from "selenium-webdriver";

export class DashboardPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    private get title() { return By.xpath('//*[@title="Dashboard"]') };

    async waitUntilTitleVisible() {
        await this.driver.wait(until.elementLocated(this.title), 10 * 1000, 'failed while waiting for dashboard title');
    }

    async getHeaderText() {
        return (await this.driver.findElement(this.title).getText()).trim();
    }

}