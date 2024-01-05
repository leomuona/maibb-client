import { AuthenticatedUser } from "../models/authenticatedUser";
import { getApiClient } from "./apiClient";

type JwtResponse = {
  token: string;
};

export async function loginRequest(
  username: string,
  password: string,
): Promise<string> {
  const response = await getApiClient(null).post<JwtResponse>(
    "/auth/login",
    {
      login: username,
      password,
    },
    {
      withCredentials: true, // save refresh token
    },
  );

  return response.data.token;
}

export async function refreshTokenRequest(): Promise<string> {
  const response = await getApiClient(null).get<JwtResponse>("/auth/refresh", {
    withCredentials: true, // send refresh token
  });

  return response.data.token;
}

export async function logoutRequest(token: string): Promise<boolean> {
  const response = await getApiClient(token).get("/auth/logout", {
    withCredentials: true, // clear refresh token
  });

  return response.status === 200;
}

export async function authenticatedUserRequest(
  token: string,
): Promise<AuthenticatedUser> {
  const response = await getApiClient(token).get<AuthenticatedUser>(
    "/auth/authenticateduser",
  );

  return response.data;
}
