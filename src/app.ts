import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './config'; // ! Always first
import logger from './logger';
import { createServer } from './server';

createConnection()
  .then(() => {
    logger.info('Database connected');
    console.log('bubi');
    return createServer(config.PORT);
  })
  .then((port) => {
    logger.info(`Server running on port ${port}`);
  })
  .catch((ex) => {
    logger.error(ex.toString());
  });
