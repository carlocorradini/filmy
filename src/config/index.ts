import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import Config from './Config';

// Load .env file
dotenv.config();

// prettier-ignore
const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'postgres',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/filmy',
  DATABASE_SSL: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : true,
  DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE ? process.env.DATABASE_SYNCHRONIZE === 'true' : true,
  DATABASE_ENTITIES: process.env.DATABASE_ENTITIES || './database/entity/**/*.js',
  DATABASE_MIGRATIONS: process.env.DATABASE_MIGRATIONS || './database/migration/**/*.js',
  DATABASE_SUBSCRIBERS: process.env.DATABASE_SUBSCRIBERS || './database/subscriber/**/*.js'
};
export default config;
