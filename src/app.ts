import 'reflect-metadata';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import { createConnection } from 'typeorm';
import config from './config'; // ! Always first
import logger from './logger';
import routes from './routes';

const app = express();

app
  .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  .use('/static', express.static(path.join(__dirname, 'public')))
  .use('/', routes);

createConnection()
  .then(() => {
    logger.info('Database connected');

    app
      .listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`);
      })
      .on('error', (ex) => {
        logger.error(`${ex.message}`);
      });
  })
  .catch((ex) => {
    logger.error(`${ex.toString()}`);
  });
