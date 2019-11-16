import StatusCode from './StatusCode';

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

const StatusMessage: EnumDictionary<StatusCode, string> = {
  [StatusCode.OK]: 'Success',
  [StatusCode.NOT_FOUND]: 'Resource not found',
  [StatusCode.UNAUTHORIZED]: 'Unauthorized',
  [StatusCode.UNKNOWN_ERROR]: 'Unknown Error',
};

export default StatusMessage;
