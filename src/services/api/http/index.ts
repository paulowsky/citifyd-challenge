import { AxiosError, HttpStatusCode } from "axios";

export type HttpRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpRequestHeader = {
  [key: string]: string;
};

export type QueryParam = {
  [key: string]: string;
};

export type HttpRequest = {
  url: string;
  method?: HttpRequestMethod;
  headers?: HttpRequestHeader;
  queryParams?: QueryParam;
  body?: any;
};

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type HttpPaginatedResponse<T> = {
  statusCode: HttpStatusCode;
  body?: { items: T[]; total: number };
};

export type HttpResponseError = {
  statusCode: HttpStatusCode;
  message: string;
  data?: any;
};

export class ApiError implements HttpResponseError {
  statusCode = 0;
  message = "";
  data = {};

  constructor(statusCode: HttpStatusCode, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

function axiosErrorHandler(error: AxiosError<any>): HttpResponseError {
  return {
    statusCode: error.response ? error.response.status : 0,
    message: error.response ? error.response.data.error : error.message,
    data: error.response ? error.response.data : {},
  };
}

export function errorHandler(error: any): HttpResponseError {
  if (error.name === "AxiosError") {
    return axiosErrorHandler(error);
  }

  const responseError: HttpResponseError = {
    statusCode: error.response ? error.response.status : 0,
    message: error.response
      ? error.response.message
      : "An error ocurred during the request",
    data: error.response ? error.response.data : {},
  };

  return responseError;
}
