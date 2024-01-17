import { QueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { refreshTokenRequest } from "../api/authentication";
import { AuthState } from "../authProvider";
import { fetchAuthenticatedUser } from "./user";

type DecodedToken = {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
};

export async function handleAuthToken(
  {
    token,
    setToken,
    authenticatedUser,
    setAuthenticatedUser,
    refresh,
    setRefresh,
  }: AuthState,
  queryClient: QueryClient,
): Promise<string | null> {
  if (token && !isExpired(token.exp)) {
    if (!authenticatedUser) {
      const user = await fetchAuthenticatedUser(token.token, queryClient);
      setAuthenticatedUser(user);
    }

    return token.token;
  }

  if (!refresh) {
    // don't make unnecessary refresh calls
    if (token) {
      setToken(null);
    }
    if (authenticatedUser) {
      setAuthenticatedUser(null);
    }
    return null;
  }

  try {
    // try to use refresh token
    const newToken = await refreshTokenRequest();
    const exp = getExpiration(newToken);
    setToken({ token: newToken, exp });

    const user = await fetchAuthenticatedUser(newToken, queryClient);
    setAuthenticatedUser(user);

    return newToken;
  } catch (_err) {
    // there is no refresh token
    setRefresh(false);

    // clear old token and authenticated user
    setToken(null);
    setAuthenticatedUser(null);

    return null;
  }
}

export function getExpiration(token: string): number {
  const decodedToken = decodeToken(token);
  return decodedToken ? decodedToken.exp : 0;
}

export function isExpired(exp: number): boolean {
  return Date.now() > exp * 1000;
}

function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode(token);
  } catch (_e) {
    // nothing
  }

  return null;
}
