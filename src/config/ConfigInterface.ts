export default interface ConfigInterface {
  NODE_ENV: string;
  PORT: number;
  DB_CONNECTION: string;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_PORT: number;
  DB_SYNCHRONIZE: boolean;
  DB_LOGGING: boolean;
  DB_ENTITIES: string;
  DB_MIGRATIONS: string;
  DB_SUBSCRIBERS: string;
}
