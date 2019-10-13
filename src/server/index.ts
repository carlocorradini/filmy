import express from 'express';

export default class Server {
  private static app: express.Application;

  private static started: boolean = false;

  private static isCreated(): boolean {
    return this.app !== undefined;
  }

  private static isStarted(): boolean {
    return this.started;
  }

  public static create(): Promise<express.Application> {
    return new Promise((resolve, reject) => {
      if (!this.isCreated()) {
        this.app = express();
        resolve(this.app);
      } else {
        reject(new Error('Server has been already created'));
      }
    });
  }

  public static start(port: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.isCreated()) {
        reject(new Error('Server has not been created'));
      }
      if (this.isStarted()) {
        reject(new Error('Server is already started'));
      }
      if (port === undefined) {
        reject(new Error('Server port is undefined'));
      }

      this.app
        .listen(port, () => {
          this.started = true;
          resolve(port);
        })
        .on('error', (ex) => {
          reject(ex.message);
        });
    });
  }
}
