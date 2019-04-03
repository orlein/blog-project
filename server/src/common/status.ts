
export interface StatusInfo {
  code: number;
  message: string;
}

export const Status = {
  1000: "Successfully done",
  1001: "Successfully done, but no results",
  4000: "Unknown Error",
}