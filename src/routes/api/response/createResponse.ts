import StatusCode from './StatusCode';
import StatusMessage from './StatusMessage';

export default (statusCode: StatusCode, data?: any) => {
  if (!(statusCode in StatusCode)) {
    // Invalid statusCode
    // eslint-disable-next-line no-param-reassign
    statusCode = StatusCode.UNKNOWN_ERROR;
  }

  return {
    success: statusCode === StatusCode.OK,
    status_code: statusCode,
    status_message: StatusMessage[statusCode],
    data,
  };
};
