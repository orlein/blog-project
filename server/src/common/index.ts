import { StatusInfo } from './Status';
export * from './Status';
export interface ResponseBody {
  status: StatusInfo;
  body: any;
}
