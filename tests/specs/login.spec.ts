import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { ENV } from 'tests/env/manager';
import { initializeDriver, quiteDriver } from 'tests/config/driverFactory';
import { ProductPage } from 'tests/pages/product.page';
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
        expect(await driver.getTitle()).equal('Swag Labs');

        await loginPage.login(loginData.valid);

        const productPage = new ProductPage(driver);
        await productPage.waitUntilTitleVisible();

        expect(await productPage.getHeaderText()).equal('Products');
    });

    it('should not login with invalid credentials', async () => {
        const loginPage = new LoginPage(driver);

        await loginPage.open(ENV.APP_URL);
        expect(await loginPage.getHeaderText()).equal('Swag Labs');

        await loginPage.login(loginData.invalid);
        expect(await loginPage.invalidLoginError()).contains('Username and password do not match any user in this service');
    });

});