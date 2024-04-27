import { expect } from 'chai';
import { WebDriver, until } from 'selenium-webdriver';
import { APP_CONSTANTS } from 'tests/constants/appConstants';
import { ENV } from 'tests/env/manager';
import { getBrowserDriver } from 'tests/config/driverFactory';
import dashboardPage from 'tests/pages/dashboard.page';
import loginPage from 'tests/pages/login.page';
import loginData from 'tests/testdata/login.json';

describe('login feature', () => {
    let driver: WebDriver;

    beforeEach('invoke browser', async () => {
        driver = await getBrowserDriver('chrome');
    });

    afterEach('close browser', async () => {
        await driver.quit();
    });

    it('should login with valid credentials', async () => {
        await loginPage.openLoginPage(driver)

        const loginPageHeader = await driver.findElement(loginPage.header).getText();

        expect(loginPageHeader).equal(APP_CONSTANTS.LOGIN_PAGE_HEADER);
        expect(await driver.getTitle()).equal(APP_CONSTANTS.LOGIN_PAGE_TITLE);

        await driver.findElement(loginPage.usernameInput).sendKeys(loginData.valid.username);
        await driver.findElement(loginPage.passwordInput).sendKeys(loginData.valid.password);
        await driver.findElement(loginPage.loginButton).click();

        await dashboardPage.waitUntilTitleVisible(driver);

        expect(await driver.getCurrentUrl()).equal(ENV.APP_URL);
        expect(await driver.getTitle()).equal(APP_CONSTANTS.DASHBOARD_PAGE_TITLE)
    });

    it('should not login with in valid username', async () => {
        await loginPage.openLoginPage(driver)

        const loginPageHeader = await driver.findElement(loginPage.header).getText();

        expect(loginPageHeader).equal(APP_CONSTANTS.LOGIN_PAGE_HEADER);

        await driver.findElement(loginPage.usernameInput).sendKeys(loginData.invalid.username);
        await driver.findElement(loginPage.passwordInput).sendKeys(loginData.valid.password);
        await driver.findElement(loginPage.loginButton).click();

        await loginPage.waitUntilLoginError(driver);
        const inValidCredentialsAlertText = await driver.findElement(loginPage.alertText).getText();
        expect(inValidCredentialsAlertText).equal(APP_CONSTANTS.INVALID_LOGIN_ERROR)
    });

    it('should not login with in valid password', async () => {
        await loginPage.openLoginPage(driver)

        const loginPageHeader = await driver.findElement(loginPage.header).getText();

        expect(loginPageHeader).equal(APP_CONSTANTS.LOGIN_PAGE_HEADER);

        await driver.findElement(loginPage.usernameInput).sendKeys(loginData.valid.username);
        await driver.findElement(loginPage.passwordInput).sendKeys(loginData.invalid.password);
        await driver.findElement(loginPage.loginButton).click();

        await loginPage.waitUntilLoginError(driver);
        const inValidCredentialsAlertText = await driver.findElement(loginPage.alertText).getText();
        expect(inValidCredentialsAlertText).equal('APP_CONSTANTS.INVALID_LOGIN_ERROR')
    });

});