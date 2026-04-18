export type BaseResponse<T = object> = {
  resultCode: number;
  message?: string;
  data: T;
}
