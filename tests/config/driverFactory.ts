import Chrome from 'selenium-webdriver/chrome';
import Edge from 'selenium-webdriver/edge';
import Safari from 'selenium-webdriver/safari';
import Firefox from 'selenium-webdriver/firefox';
import { PageLoadStrategy } from 'selenium-webdriver/lib/capabilities';
import { Builder, WebDriver, Browser } from 'selenium-webdriver';
import { BrowserType } from 'tests/types/driver';

export const getBrowserDriver = async (browserName: BrowserType): Promise<WebDriver> => {
    let driver: WebDriver;

    if (browserName === 'chrome') {
        const options = new Chrome.Options();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    }
    else if (browserName === 'firefox') {
        const options = new Firefox.Options();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();
    }
    else if (browserName === 'safari') {
        const options = new Safari.Options();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = await new Builder().forBrowser(Browser.SAFARI).setSafariOptions(options).build();
    }
    else if (browserName === 'edge') {
        const options = new Edge.Options();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = new Builder().forBrowser(Browser.EDGE).setEdgeOptions(options).build();
    }
    else {
        const options = new Chrome.Options();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    };

    await driver.manage().setTimeouts({ implicit: 10 * 1000, pageLoad: 30 * 1000 });
    await driver.manage().window().maximize();
    return driver;
};