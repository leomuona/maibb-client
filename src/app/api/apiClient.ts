import { AxiosRequestConfig, AxiosResponse } from "axios";

import { getToken } from "../user/token";
import { getAxios } from "./axios";

type ApiClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ) => Promise<AxiosResponse<T>>;

  post: <T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig | undefined,
  ) => Promise<AxiosResponse<T>>;

  put: <T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig | undefined,
  ) => Promise<AxiosResponse<T>>;

  patch: <T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig | undefined,
  ) => Promise<AxiosResponse<T>>;

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ) => Promise<AxiosResponse<T>>;
};

export function getApiClient(): ApiClient {
  const token = getToken();

  return {
    get: async <T>(
      url: string,
      config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<T>> =>
      getAxios().get(url, withAuthorization(token, config)),

    post: async <T>(
      url: string,
      data: unknown,
      config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<T>> =>
      getAxios().post(url, data, withAuthorization(token, config)),

    put: async <T>(
      url: string,
      data: unknown,
      config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<T>> =>
      getAxios().put(url, data, withAuthorization(token, config)),

    patch: async <T>(
      url: string,
      data: unknown,
      config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<T>> =>
      getAxios().patch(url, data, withAuthorization(token, config)),

    delete: async <T>(
      url: string,
      config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<T>> =>
      getAxios().delete(url, withAuthorization(token, config)),
  };
}

const withAuthorization = (
  token: string | null,
  config: AxiosRequestConfig | undefined,
): AxiosRequestConfig =>
  token
    ? {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...config?.headers,
        },
      }
    : { ...config };
