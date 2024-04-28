import { BrowserType } from 'tests/types/driver';
import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(process.cwd(), '.env') });

export const FRAMEWORK_ENV_CONFIG = {
    BROWSER: process.env.BROWSER as BrowserType,
    RUN_MODE: process.env.RUN_MODE as string,
    GRID_URL: process.env.GRID_URL as string
};