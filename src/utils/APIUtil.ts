// eslint-disable-next-line no-unused-vars
import { Request } from 'express';
import { InvalidIdError, InvalidCredentialsError } from './errors';

interface Credentials {
  username: string;
  password: string;
}

export default class APIUtil {
  private static readonly ID_DEFAULT_VALUE: number = 0;

  private static isValidCredentials(credentials: Credentials): boolean {
    return (
      typeof credentials !== 'undefined' &&
      typeof credentials.username !== 'undefined' &&
      credentials.username !== '' &&
      typeof credentials.password !== 'undefined' &&
      credentials.password !== ''
    );
  }

  public static id(id: string, strict: boolean = false): Promise<number> {
    const idParsed = parseInt(id, 10) || APIUtil.ID_DEFAULT_VALUE;

    return new Promise((resolve, reject) => {
      if ((strict && idParsed === APIUtil.ID_DEFAULT_VALUE) || idParsed < 0) {
        reject(new InvalidIdError(`${id} is not a valid identifier`));
      }
      resolve(idParsed);
    });
  }

  public static ip(req: Request): Promise<string> {
    const ip: string | undefined = req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'][0]
      : req.connection.remoteAddress;

    return new Promise((resolve, reject) => {
      if (!ip) {
        reject();
      }
      resolve(ip);
    });
  }

  public static credentials(req: Request): Promise<Credentials> {
    const credentials = <Credentials>req.body;

    return new Promise((resolve, reject) => {
      if (!APIUtil.isValidCredentials(credentials)) {
        reject(new InvalidCredentialsError('Invalid Credentials received from Request'));
      }
      resolve(credentials);
    });
  }
}
