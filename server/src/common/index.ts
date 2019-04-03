import { StatusInfo } from './status';
export * from './status';
export interface ResponseBody {
  status: StatusInfo;
  body: any;
}
