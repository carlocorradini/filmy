/* eslint-disable no-useless-constructor */
export default class ValidationError implements Error {
  name: string;

  message: string;

  stack?: string | undefined;

  public arr: any;

  constructor(message: string, arr: any) {
    this.name = '';
    this.message = message;
    this.arr = arr;
  }
}
