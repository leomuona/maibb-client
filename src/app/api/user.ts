import { User } from "../models/user";
import { getApiClient } from "./apiClient";

export type RegisterUserData = {
  name: string;
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export async function loginRequest(
  username: string,
  password: string,
): Promise<string> {
  const response = await getApiClient().post<LoginResponse>("/user/login", {
    username,
    password,
  });

  return response.data.token;
}

export async function logoutRequest(): Promise<boolean> {
  const response = await getApiClient().get("/user/logout");

  return response.status === 200;
}

export async function authenticatedUserRequest(): Promise<User> {
  const response = await getApiClient().get<User>("/user/authenticated");

  return response.data;
}

export async function registerUserRequest(
  data: RegisterUserData,
): Promise<User> {
  const response = await getApiClient().post<User>("/user/register", data);

  return response.data;
}
