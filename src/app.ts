import './config'; // Always first!
import path from 'path';
import express from 'express';
import nunjucks from 'nunjucks';
import { createConnection } from 'typeorm';
import logger from './logger';
import routes from './routes';
import Server from './server';

createConnection()
  .then(() => {
    logger.info('Database connected');
    return Server.create();
  })
  .then((app) => {
    app.set('view engine', 'njk');
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.use('/', routes);

    nunjucks.configure(path.join(__dirname, 'views'), {
      autoescape: true,
      noCache: true,
      express: app,
    });

    return Server.start(process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 0);
  })
  .then((port) => {
    logger.info(`Server running on port ${port}`);
  })
  .catch((ex) => {
    logger.error(ex.toString());
  });
