// eslint-disable-next-line no-unused-vars
import { ValidationError } from 'class-validator';
// eslint-disable-next-line no-unused-vars
import { Request } from 'express';

interface Credentials {
  username: string;
  password: string;
}

export default class APIUtil {
  private static readonly ID_DEFAULT_VALUE: number = 0;

  private static validCredentials(credentials: Credentials): boolean {
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
      if (strict && idParsed === APIUtil.ID_DEFAULT_VALUE) {
        reject(new Error(`${id} is not a valid identifier`));
      }
      resolve(idParsed);
    });
  }

  public static pruneValidationError(errors: ValidationError[]): ValidationError[] {
    return errors.map((error: ValidationError) => {
      // eslint-disable-next-line no-param-reassign
      delete error.target;
      // eslint-disable-next-line no-param-reassign
      delete error.children;
      return error;
    });
  }

  public static credentials(req: Request): Promise<Credentials> {
    const credentials = <Credentials>req.body;

    return new Promise((resolve, reject) => {
      if (!APIUtil.validCredentials(credentials)) {
        reject(new Error('Invalid Credentials'));
      }
      resolve(credentials);
    });
  }
}
