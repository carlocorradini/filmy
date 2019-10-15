import './config'; // Always first!
import 'reflect-metadata';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import nunjucks from 'nunjucks';
import { createConnection } from 'typeorm';
import logger from './logger';
import routes from './routes';

const app = express();

app
  .set('view engine', 'njk')
  .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  .use('/static', express.static(path.join(__dirname, 'public')))
  .use('/', routes);

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  noCache: true,
  express: app,
});

createConnection()
  .then(() => {
    logger.info('Database connected');

    app
      .listen(process.env.PORT, () => {
        logger.info(`Server running on port ${process.env.PORT}`);
      })
      .on('error', (ex) => {
        logger.error(`Server error: ${ex.message}`);
      });
  })
  .catch((ex) => {
    logger.error(`Database connection | ${ex.toString()}`);
  });
