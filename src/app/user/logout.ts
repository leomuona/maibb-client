import { QueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../api/user";
import { clearToken } from "./token";

export async function logout(queryClient: QueryClient): Promise<void> {
  try {
    await logoutRequest();
  } catch (_err) {
    // nothing
  }
  await queryClient.invalidateQueries();
  clearToken();
}
