import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { APP_CONSTANTS } from 'tests/constants/appConstants';
import { ENV } from 'tests/env/manager';
import { initializeDriver, quiteDriver } from 'tests/config/driverFactory';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { LoginPage } from 'tests/pages/login.page';
import loginData from 'tests/testdata/login.json';

describe('login feature', () => {
    let driver: WebDriver;

    beforeEach('invoke browser', async () => {
        driver = await initializeDriver();
    });

    afterEach('close browser', async () => {
        await quiteDriver(driver);
    });

    it('should login with valid credentials @smoke', async () => {
        const loginPage = new LoginPage(driver);

        await loginPage.open(ENV.APP_URL);
        expect(await loginPage.getHeaderText()).equal(APP_CONSTANTS.LOGIN_PAGE_HEADER);
        expect(await driver.getTitle()).equal(APP_CONSTANTS.LOGIN_PAGE_TITLE);

        await loginPage.login(loginData.valid);

        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.waitUntilTitleVisible();

        expect(await driver.getCurrentUrl()).equal(ENV.APP_URL);
        expect(await driver.getTitle()).equal(APP_CONSTANTS.DASHBOARD_PAGE_TITLE);
        expect(await dashboardPage.getHeaderText()).equal(APP_CONSTANTS.DASHBOARD_PAGE_HEADER);
    });

    it('should not login with invalid credentials', async () => {
        const loginPage = new LoginPage(driver);

        await loginPage.open(ENV.APP_URL);
        expect(await loginPage.getHeaderText()).equal(APP_CONSTANTS.LOGIN_PAGE_HEADER);

        await loginPage.login(loginData.invalid);
        expect(await loginPage.invalidLoginError()).equal(APP_CONSTANTS.INVALID_LOGIN_ERROR);

    });

});