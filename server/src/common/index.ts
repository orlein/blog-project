export * from './codes';
export * from './util';
import * as codes from './codes';
export class ResponseBody {
  status: codes.CustomResponseCodes;
  body: any;

  constructor(status: codes.CustomResponseCodes, body: any) {
    this.status = status;
    this.body = body;
  }
}
