import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { ENV } from 'tests/env/manager';
import { initializeDriver, quiteDriver } from 'tests/config/driverFactory';
import { LoginPage } from 'tests/pages/login.page';
import loginData from 'tests/testdata/login.json';
import { ProductPage } from 'tests/pages//product.page';
import { CartPage } from 'tests/pages/cart.page';

describe('customers feature', () => {
    let driver: WebDriver;

    beforeEach('invoke browser', async () => {
        driver = await initializeDriver();
    });

    afterEach('close browser', async () => {
        await quiteDriver(driver);
    });

    it('@e2e should be able to purchase product', async () => {
        const loginPage = new LoginPage(driver);
        await loginPage.open(ENV.APP_URL);
        await loginPage.login(loginData.valid);

        const productPage = new ProductPage(driver);
        await productPage.waitUntilTitleVisible();

        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.openCart();

        const cartPage = new CartPage(driver);
        expect(await cartPage.title.getText()).equal('Your Cart');
        await cartPage.checkout();
        expect(await cartPage.title.getText()).equal('Checkout: Your Information');

        await cartPage.fillCheckoutInformation({ firstName: 'John', lastName: 'Doe', postalCode: '12345' });

        await cartPage.finishCheckout();
        expect(await cartPage.title.getText()).equal('Checkout: Complete!');

        const orderConfirmation = await cartPage.getOrderConfirmation();
        expect(orderConfirmation.confirmation).equal('Thank you for your order!');
        expect(orderConfirmation.completeTextValue).equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

});