import * as dotenv from 'dotenv';

dotenv.config();

export const environment = process.env.NODE_ENV;
export const isDevelopment = /development/i.test(environment);
export const isStaging = /staging/i.test(environment);
export const isProduction = /production/i.test(environment);
