import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';
import logger from './logger';

// Load .env configuration file
dotenv.config();

createConnection()
  .then(() => {
    logger.info('Database successfully connected');
  })
  .catch((error) => {
    logger.error(error);
  });

// Create Express application
const app = express();

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.header('text/html').send('<h1>Hi Man!!!</h1>');
});

app.listen(process.env.PORT, () => {
  logger.info('Server Started');
});
