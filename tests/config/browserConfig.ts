import { Builder } from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';
import Edge from 'selenium-webdriver/edge';
import Safari from 'selenium-webdriver/safari';
import Firefox from 'selenium-webdriver/firefox';
import { Browser, PageLoadStrategy } from 'selenium-webdriver/lib/capabilities';
import { BrowserType } from 'tests/types/driver';

const getChromeInstance = async () => {
    const options = new Chrome.Options();
    options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
    return await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
}

const getFirefoxInstance = async () => {
    const options = new Firefox.Options();
    options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
    return await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();
}

const getSafariInstance = async () => {
    const options = new Safari.Options();
    options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
    return await new Builder().forBrowser(Browser.SAFARI).setSafariOptions(options).build();
}

const getEdgeInstance = async () => {
    const options = new Edge.Options();
    options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
    return new Builder().forBrowser(Browser.EDGE).setEdgeOptions(options).build();
}

export const getBrowserInstance = async (browserName: BrowserType) => {
    if (browserName === 'chrome') {
        return await getChromeInstance();
    }
    else if (browserName === 'firefox') {
        return await getFirefoxInstance();
    }
    else if (browserName === 'safari') {
        return await getSafariInstance();
    }
    else if (browserName === 'edge') {
        return await getEdgeInstance();
    }
    else {
        return await getChromeInstance();
    };
}