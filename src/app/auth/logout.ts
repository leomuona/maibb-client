import { QueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../api/authentication";
import { AuthState } from "../authProvider";
import { handleAuthToken } from "./token";

export async function logout(
  auth: AuthState,
  queryClient: QueryClient,
): Promise<void> {
  const { setToken, setAuthenticatedUser, setRefresh } = auth;
  try {
    const token = await handleAuthToken(auth, queryClient);
    if (!token) {
      // refresh failed, nothing to do
      return;
    }
    await logoutRequest(token);
  } catch (_err) {
    // nothing
  }

  // clear authentication
  setToken(null);
  setAuthenticatedUser(null);
  setRefresh(false);
}
