import StatusCode from './StatusCode';

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

const StatusMessage: EnumDictionary<StatusCode, string> = {
  [StatusCode.OK]: 'Success',
  [StatusCode.BAD_REQUEST]: 'Invalid request message',
  [StatusCode.UNAUTHORIZED]: 'Unauthorized',
  [StatusCode.NOT_FOUND]: 'Resource not found',
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server error',
  [StatusCode.UNKNOWN_ERROR]: 'Unknown Error',
};

export default StatusMessage;
