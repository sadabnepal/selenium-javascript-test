import { WebDriver } from 'selenium-webdriver';
import { getBrowserInstance } from './browserConfig';

export const initializeDriver = async () => {
    const driver = await getBrowserInstance();
    await driver.manage().setTimeouts({ implicit: 10 * 1000, pageLoad: 30 * 1000 });
    await driver.manage().window().maximize();
    return driver;
};

export const quiteDriver = async (driver: WebDriver) => {
    if (driver) {
        await driver.quit();
    }
};