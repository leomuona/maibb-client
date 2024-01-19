import { QueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api/authentication";
import { clearToken, setToken } from "./token";

export async function login(
  username: string,
  password: string,
  queryClient: QueryClient,
): Promise<boolean> {
  try {
    const token = await loginRequest(username, password);
    setToken(token);
    await queryClient.invalidateQueries();

    return true;
  } catch (_err) {
    clearToken();
    await queryClient.invalidateQueries();
  }

  return false;
}
