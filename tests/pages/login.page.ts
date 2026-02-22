import { By, WebDriver, until } from 'selenium-webdriver';
export class LoginPage {

    constructor(private driver: WebDriver) {
        this.driver = driver;
    }

    private get header() { return By.className('login_logo') }
    private get usernameInput() { return By.id('user-name') }
    private get passwordInput() { return By.id('password') }
    private get loginButton() { return By.id('login-button') }
    private get loginError() { return By.xpath('//h3[@data-test="error"]') }

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
    }

    async invalidLoginError() {
        await this.waitUntilLoginError();
        const errorText = await this.driver.findElement(this.loginError).getText();
        return errorText.trim();
    }

}