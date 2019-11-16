import express from 'express';
import configServer from './configServer';

const createServer = (port: number): Promise<number> => {
  const app = express();

  return new Promise((resolve, reject) => {
    configServer(app).then(() => {
      app
        .listen(port, () => {
          resolve(port);
        })
        .on('error', (ex) => {
          reject(ex.message);
        });
    });
  });
};

export default createServer;
