import { By, WebDriver, until } from 'selenium-webdriver';
export class LoginPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    private get header() { return By.className('login-title') }
    private get usernameInput() { return By.id('login_username') }
    private get passwordInput() { return By.id('login_password') }
    private get loginButton() { return By.xpath('//button[contains(@class, "login-button")]') }
    private get loginError() { return By.xpath('//*[@class="login-error visible"]') }
    private get alertText() { return By.className('alert-text') }

    async open(appUrl: string) {
        await this.driver.get(appUrl);
        await this.driver.wait(until.elementLocated(this.header), 10 * 1000, 'failed while waiting for login title');
    }

    async getHeaderText() {
        const loginPageHeader = await this.driver.findElement(this.header).getText();
        return loginPageHeader.trim();
    }

    async login(data: { username: string, password: string }) {
        await this.driver.findElement(this.usernameInput).sendKeys(data.username);
        await this.driver.findElement(this.passwordInput).sendKeys(data.password);
        await this.driver.findElement(this.loginButton).click();
    }

    private async waitUntilLoginError() {
        await this.driver.wait(until.elementLocated(this.loginError), 10 * 1000, 'failed while waiting for login error');
        await this.driver.wait(until.elementTextContains(this.driver.findElement(this.alertText), 'invalid'));
    }

    async invalidLoginError() {
        await this.waitUntilLoginError();
        const errorText = await this.driver.findElement(this.alertText).getText();
        return errorText.trim();
    }

}