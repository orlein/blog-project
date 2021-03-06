export interface CustomErrorCodes {
  code: number;
  message: string;
}

export class CustomError extends Error {
  private code: CustomErrorCodes;
  private date: Date;
  constructor(code: CustomErrorCodes, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.date = new Date();
  }
}

export interface CustomResponseCodes {
  code: number;
  message: string;
}
export const UNKNOWN_ERROR: CustomResponseCodes = { code: -1, message: 'Unknown Error'};
export const CANNOT_PARSE_NUMBER: CustomResponseCodes = { code: 101, message: 'Cannot parse number, please check the object.'}
export const USER_ALREADY_EXISTS: CustomResponseCodes = { code: 301, message: 'User already exists'}
export const USER_NOT_EXISTS: CustomResponseCodes = { code: 302, message: 'User not exists'};

export const SUCCESSFUL = { code: 200, message: 'Successfully returned'}