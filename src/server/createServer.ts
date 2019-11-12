import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import routes from '../routes';

const app = express();

app
  .use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
  .use('/static', express.static(path.join(__dirname, '../public')))
  .use('/', routes);

const createServer = (port: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    app
      .listen(port, () => {
        resolve(port);
      })
      .on('error', (ex) => {
        reject(ex.message);
      });
  });
};

export default createServer;
