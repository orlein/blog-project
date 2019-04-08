import { CustomError, CANNOT_PARSE_NUMBER, UNKNOWN_ERROR } from "./codes";
export abstract class Util {
  public static safeParse = (num: any): number=> {
    const n = Number(num);
    if (!n) {
      throw new CustomError(CANNOT_PARSE_NUMBER);
    } else {
      return n;
    }
  }

}