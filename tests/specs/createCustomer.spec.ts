import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { ENV } from 'tests/env/manager';
import { initializeDriver, quiteDriver } from 'tests/config/driverFactory';
import { LoginPage } from 'tests/pages/login.page';
import loginData from 'tests/testdata/login.json';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { NavigationPage } from 'tests/pages/navigation.page';

describe('customers feature', () => {
    let driver: WebDriver;

    beforeEach('invoke browser', async () => {
        driver = await initializeDriver();
    });

    afterEach('close browser', async () => {
        await quiteDriver(driver);
    });

    it('should @createCustomer with valid data', async () => {
        const loginPage = new LoginPage(driver);
        await loginPage.open(ENV.APP_URL);
        await loginPage.login(loginData.valid);
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.waitUntilTitleVisible();

        const navigationTab = new NavigationPage(driver);
        await navigationTab.clickOnLeftNavigationMenu('customers');
        expect(await navigationTab.getHeaderText()).equal('Customers');
    });

});