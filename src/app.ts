import './config'; // Always first!
import path from 'path';
import express from 'express';
import { createConnection } from 'typeorm';
import logger from './logger';

(async () => {
  try {
    await createConnection().then(() => {
      logger.info('Database successfully connected');
    });
    const app = express();

    app.set('views', path.join(__dirname, 'views'));

    app.get('/', (req, res) => {
      res.header('text/html').send('<h1>Hi Man!!!</h1>');
    });

    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port ${process.env.port}`);
    });
  } catch (ex) {
    logger.error(ex);
  }
})();
