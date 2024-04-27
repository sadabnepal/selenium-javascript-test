import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), 'tests', 'env', `${process.env.ENV || 'dev'}.env`) });

export const ENV = {
    APP_URL: process.env.APP_URL as string
};