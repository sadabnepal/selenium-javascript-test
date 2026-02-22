import { Builder } from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';
import Edge from 'selenium-webdriver/edge';
import Firefox from 'selenium-webdriver/firefox';
import { Browser } from 'selenium-webdriver/lib/capabilities';
import { FRAMEWORK_ENV_CONFIG } from 'tests/env/manager';

const chromeOptions = new Chrome.Options();
chromeOptions.addArguments('--disable-notifications');
chromeOptions.addArguments('--disable-popup-blocking');

const firefoxOptions = new Firefox.Options();
firefoxOptions.setPreference('dom.webnotifications.enabled', false);
firefoxOptions.setPreference('dom.push.enabled', false);

const edgeOptions = new Edge.Options();
edgeOptions.addArguments('--disable-notifications');
edgeOptions.addArguments('--disable-popup-blocking');

const getChromeInstance = async () => {
    if (FRAMEWORK_ENV_CONFIG.RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.CHROME)
            .usingServer(FRAMEWORK_ENV_CONFIG.GRID_URL)
            .setChromeOptions(chromeOptions)
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(chromeOptions)
            .build();
    }
};

const getFirefoxInstance = async () => {
    if (FRAMEWORK_ENV_CONFIG.RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.FIREFOX)
            .usingServer(FRAMEWORK_ENV_CONFIG.GRID_URL)
            .setFirefoxOptions(firefoxOptions)
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxOptions(new Firefox.Options())
            .build();
    }
};

const getEdgeInstance = async () => {
    if (FRAMEWORK_ENV_CONFIG.RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.EDGE)
            .usingServer(FRAMEWORK_ENV_CONFIG.GRID_URL)
            .setEdgeOptions(edgeOptions)
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.EDGE)
            .setEdgeOptions(edgeOptions)
            .build();
    }
};

export const getBrowserInstance = async () => {
    switch (FRAMEWORK_ENV_CONFIG.BROWSER) {
        case 'chrome':
            return await getChromeInstance();
        case 'firefox':
            return await getFirefoxInstance();
        case 'edge':
            return await getEdgeInstance();
        default:
            return await getChromeInstance();
    }
};