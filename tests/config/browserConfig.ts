import { Builder } from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';
import Edge from 'selenium-webdriver/edge';
import Firefox from 'selenium-webdriver/firefox';
import { Browser } from 'selenium-webdriver/lib/capabilities';
import { FRAMEWORK_ENV_CONFIG } from 'tests/helper/envReader';

const REMOTE_GRID_URL = FRAMEWORK_ENV_CONFIG.GRID_URL;
const RUN_MODE = FRAMEWORK_ENV_CONFIG.RUN_MODE;
const BROWSER_NAME = FRAMEWORK_ENV_CONFIG.BROWSER;

const getChromeInstance = async () => {
    if (RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.CHROME)
            .usingServer(REMOTE_GRID_URL)
            .setChromeOptions(new Chrome.Options())
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(new Chrome.Options())
            .build();
    }
};

const getFirefoxInstance = async () => {
    if (RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.FIREFOX)
            .usingServer(REMOTE_GRID_URL)
            .setFirefoxOptions(new Firefox.Options())
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxOptions(new Firefox.Options())
            .build();
    }
};

const getEdgeInstance = async () => {
    if (RUN_MODE === 'docker') {
        return await new Builder()
            .forBrowser(Browser.EDGE)
            .usingServer(REMOTE_GRID_URL)
            .setEdgeOptions(new Edge.Options())
            .build();
    } else {
        return await new Builder()
            .forBrowser(Browser.EDGE)
            .setEdgeOptions(new Edge.Options())
            .build();
    }
};

export const getBrowserInstance = async () => {
    switch (BROWSER_NAME) {
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