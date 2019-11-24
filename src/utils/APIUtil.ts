// eslint-disable-next-line no-unused-vars
import { ValidationError } from 'class-validator';
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import logger from '../logger';
import StatusCode from './StatusCode';
import StatusMessage from './StatusMessage';

export default class APIUtil {
  private static readonly ID_DEFAULT_VALUE: number = 0;

  public static id(id: string, strict: boolean = false): Promise<number> {
    const idParsed = parseInt(id, 10) || APIUtil.ID_DEFAULT_VALUE;

    return new Promise((resolve, reject) => {
      if (strict && idParsed === APIUtil.ID_DEFAULT_VALUE) {
        reject(new Error(`${id} is not a valid identifier`));
      }
      resolve(idParsed);
    });
  }

  public static token(req: Request): Promise<string> {
    let token: string | undefined = req.headers['x-access-token']
      ? req.headers['x-access-token'][0]
      : req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    return new Promise((resolve, reject) => {
      if (!token) {
        reject();
      }
      resolve(token);
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

  public static generateResponse(res: Response, statusCode: StatusCode, data?: any) {
    if (!(statusCode in StatusCode)) {
      // Invalid statusCode
      // eslint-disable-next-line no-param-reassign
      statusCode = StatusCode.UNKNOWN_ERROR;
    }

    res
      .status(statusCode)
      .json({
        success: statusCode === StatusCode.OK,
        status_code: statusCode,
        status_message: StatusMessage[statusCode],
        ...(statusCode < 400 && { data }),
        ...(statusCode >= 400 && { error_message: data }),
      })
      .end();

    logger.debug(`Sending Response data: ${data instanceof Object ? JSON.stringify(data) : data}`);
  }
}
