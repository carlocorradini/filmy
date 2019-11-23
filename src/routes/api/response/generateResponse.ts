// eslint-disable-next-line no-unused-vars
import { Response } from 'express';
import logger from '../../../logger';
import StatusCode from './StatusCode';
import StatusMessage from './StatusMessage';

export default (res: Response, statusCode: StatusCode, data?: any) => {
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
};
