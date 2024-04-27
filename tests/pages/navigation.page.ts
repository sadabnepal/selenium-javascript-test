import { By, WebDriver } from "selenium-webdriver";

export class NavigationPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    async clickOnLeftNavigationMenu(menuItemName: string) {
        const element = By.xpath(`//a[contains(@href, "${menuItemName}")]`);
        await this.driver.findElement(element).click();
    }

    private get header() { return By.className('page-title') }

    async getHeaderText() {
        const pageHeader = await this.driver.findElement(this.header).getText();
        return pageHeader.trim();
    }
}