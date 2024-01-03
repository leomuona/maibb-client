import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL ?? "https://localhost:8443",
  timeout: 60000,
};

let client: AxiosInstance | null = null;

export function getAxios(): AxiosInstance {
  if (!client) {
    client = axios.create(axiosConfig);
  }

  return client;
}
