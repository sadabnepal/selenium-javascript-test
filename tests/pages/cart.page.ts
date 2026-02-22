import { By, WebDriver } from 'selenium-webdriver';

export class CartPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    get title() { return this.driver.findElement(By.className('title')) };

    async checkout() {
        const checkoutButton = By.id('checkout');
        await this.driver.findElement(checkoutButton).click();
    }

    async fillCheckoutInformation(data: { firstName: string, lastName: string, postalCode: string }) {
        await this.driver.findElement(By.id('first-name')).sendKeys(data.firstName);
        await this.driver.findElement(By.id('last-name')).sendKeys(data.lastName);
        await this.driver.findElement(By.id('postal-code')).sendKeys(data.postalCode);
        await this.driver.findElement(By.id('continue')).click();
    }

    async finishCheckout() {
        const finishButton = By.id('finish');
        await this.driver.findElement(finishButton).click();
    }

    async getOrderConfirmation() {
        const confirmationMessage = By.className('complete-header');
        const completeText = By.className('complete-text');
        const confirmation = await this.driver.findElement(confirmationMessage).getText();
        const completeTextValue = await this.driver.findElement(completeText).getText();
        return { confirmation, completeTextValue };
    }

}