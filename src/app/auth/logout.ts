import { logoutRequest } from "../api/authentication";
import { clearToken, getToken } from "./token";

export async function logout(): Promise<boolean> {
  try {
    const token = await getToken();
    const result = await logoutRequest(token);
    clearToken();

    return result;
  } catch (err) {
    console.log(err);
    clearToken();
  }

  return false;
}
