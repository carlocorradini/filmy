import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';

// Load .env configuration file
dotenv.config();

createConnection()
  .then(() => {
    console.log('Database successfully connected !!!');
  })
  .catch((error) => {
    console.error(error);
  });

// Create Express application
const app = express();

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.header('text/html').send('<h1>Hi Man</h1>');
});

app.listen(process.env.PORT, () => {
  console.log('Server Started');
});
