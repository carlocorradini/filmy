export default interface Config {
  NODE_ENV: string;
  PORT: number;
  DATABASE_TYPE: string;
  DATABASE_URL: string;
  DATABASE_SSL: boolean;
  DATABASE_SYNCHRONIZE: boolean;
  DATABASE_ENTITIES: string | Function[] | undefined;
  DATABASE_MIGRATIONS: string | Function[] | undefined;
  DATABASE_SUBSCRIBERS: string | Function[] | undefined;
}
