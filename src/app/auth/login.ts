import { QueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api/authentication";
import { AuthState } from "../authProvider";
import { getExpiration } from "./token";
import { fetchAuthenticatedUser } from "./user";

export async function login(
  username: string,
  password: string,
  auth: AuthState,
  queryClient: QueryClient,
): Promise<boolean> {
  const { setToken, setAuthenticatedUser, setRefresh } = auth;
  try {
    const token = await loginRequest(username, password);
    const exp = getExpiration(token);
    setToken({ token, exp });

    const user = await fetchAuthenticatedUser(token, queryClient);
    setAuthenticatedUser(user);

    // make sure refresh token calls are enabled
    setRefresh(true);

    return true;
  } catch (_err) {
    setToken(null);
    setAuthenticatedUser(null);
    setRefresh(false);
  }

  return false;
}
