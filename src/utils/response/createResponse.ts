enum StatusCode {
  // eslint-disable-next-line no-unused-vars
  OK = 0,
  // eslint-disable-next-line no-unused-vars
  NOT_FOUND,
  // eslint-disable-next-line no-unused-vars
  UNAUTHORIZED,
  // eslint-disable-next-line no-unused-vars
  UNKNOWN_ERROR,
}

const StatusMessage: string[] = ['Success', 'Not Found', 'Unauthorized', 'Unknown Error'];

const createResponse = (statusCode: StatusCode, data?: any) => {
  if (
    statusCode < StatusCode.OK ||
    statusCode > StatusCode.UNKNOWN_ERROR ||
    (statusCode === StatusCode.OK && data === undefined)
  )
    // eslint-disable-next-line no-param-reassign
    statusCode = StatusCode.UNKNOWN_ERROR;

  return {
    success: statusCode === StatusCode.OK,
    status_code: statusCode,
    status_message: StatusMessage[statusCode],
    data: statusCode === StatusCode.OK ? data : {},
  };
};

export { StatusCode, createResponse };
