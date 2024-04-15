import axios from "axios";

import {
  HttpPaginatedResponse,
  HttpRequest,
  HttpResponse,
  errorHandler,
} from "./index";

export const api = axios.create({
  timeout: 20000,
});

export async function apiRequest<T>({
  body,
  queryParams,
  ...rest
}: HttpRequest): Promise<HttpResponse<T>> {
  try {
    const response = await api.request<T>({
      data: body,
      params: queryParams,
      ...rest,
    });

    return new Promise((resolve) => {
      resolve({
        statusCode: response.status,
        body: response.data,
      });
    });
  } catch (err) {
    return new Promise((_, reject) => {
      reject(errorHandler(err));
    });
  }
}

export async function useApiRequestWithPagination<T>(
  data: HttpRequest
): Promise<HttpPaginatedResponse<T>> {
  return apiRequest(data);
}
