import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import ConfigInterface from './ConfigInterface';

// Load .env file
dotenv.config();

// prettier-ignore
const config: ConfigInterface = {
  NODE_ENV: process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'production',
  PORT: process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 0,
  DB_CONNECTION: process.env.TYPEORM_CONNECTION !== undefined ? process.env.TYPEORM_CONNECTION : '',
  DB_HOST: process.env.TYPEORM_HOST !== undefined ? process.env.TYPEORM_HOST : '',
  DB_USERNAME: process.env.TYPEORM_USERNAME !== undefined ? process.env.TYPEORM_USERNAME : '',
  DB_PASSWORD: process.env.TYPEORM_PASSWORD !== undefined ? process.env.TYPEORM_PASSWORD : '',
  DB_DATABASE: process.env.TYPEORM_DATABASE !== undefined ? process.env.TYPEORM_DATABASE : '',
  DB_PORT: process.env.TYPEORM_PORT !== undefined ? parseInt(process.env.TYPEORM_PORT, 10) : 0,
  DB_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE !== undefined ? process.env.TYPEORM_SYNCHRONIZE === 'true' : false,
  DB_LOGGING: process.env.TYPEORM_LOGGING !== undefined ? process.env.TYPEORM_LOGGING === 'true' : false,
  DB_ENTITIES: process.env.TYPEORM_ENTITIES !== undefined ? process.env.TYPEORM_ENTITIES : '',
  DB_MIGRATIONS: process.env.TYPEORM_MIGRATIONS !== undefined ? process.env.TYPEORM_MIGRATIONS : '',
  DB_SUBSCRIBERS: process.env.TYPEORM_SUBSCRIBERS !== undefined ? process.env.TYPEORM_SUBSCRIBERS : '',
};

export default config;
