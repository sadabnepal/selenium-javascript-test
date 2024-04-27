import { By, WebDriver, until } from 'selenium-webdriver';
import { ENV } from 'tests/env/manager';

class LoginPage {

    async openLoginPage(driver: WebDriver) {
        await driver.get(ENV.APP_URL);
        await driver.wait(until.elementLocated(this.header), 10 * 1000, 'failed while waiting for login title');
    }

    get header() {
        return By.className('login-title')
    }

    get usernameInput() {
        return By.id('login_username');
    }

    get passwordInput() {
        return By.id('login_password');
    }

    get loginButton() {
        return By.xpath('//button[contains(@class, "login-button")]');
    }

    get alertText() {
        return By.className('alert-text');
    }

    private get loginError() {
        return By.xpath('//*[@class="login-error visible"]');
    }

    async waitUntilLoginError(driver: WebDriver) {
        await driver.wait(until.elementLocated(this.loginError), 10 * 1000, 'failed while waiting for login error');
        await driver.wait(until.elementTextContains(driver.findElement(this.alertText), 'invalid'));
    }

}
export default new LoginPage();