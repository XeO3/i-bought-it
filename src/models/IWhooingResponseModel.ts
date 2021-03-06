export interface IWhooingResponseModel<T> {
  code: number;
  message: string;
  error_parameters: object;
  rest_of_api: number;
  results: T;
}
