import { AuthenticatedUser } from "../models/authenticatedUser";
import { getApiClient } from "./apiClient";

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

export async function authenticatedUserRequest(): Promise<AuthenticatedUser> {
  const response = await getApiClient().get<AuthenticatedUser>(
    "/user/authenticated",
  );

  return response.data;
}
