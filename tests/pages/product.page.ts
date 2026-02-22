import { By, WebDriver, until } from 'selenium-webdriver';

export class ProductPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    private get title() { return By.className('title') };

    async waitUntilTitleVisible() {
        await this.driver.wait(until.elementLocated(this.title), 10 * 1000, 'failed while waiting for dashboard title');
    }

    async getHeaderText() {
        return (await this.driver.findElement(this.title).getText()).trim();
    }

    async addProductToCart(productName: string) {
        const productNameElement = By.xpath(`//div[text()="${productName}"]`);
        const addButton = await this.driver.findElement(productNameElement).findElement(By.xpath('./ancestor::div[@class="inventory_item"]//button'));
        await this.driver.wait(until.elementIsEnabled(addButton), 5 * 1000);
        await addButton.click();
    }

    async openCart() {
        const cartElement = await this.driver.findElement(By.className('shopping_cart_link'));
        await this.driver.wait(until.elementIsEnabled(cartElement), 5 * 1000);
        await cartElement.click();
    }

}