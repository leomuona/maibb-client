import { loginRequest } from "../api/authentication";
import { setToken } from "./token";

export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    const response = await loginRequest(username, password);
    setToken(response);

    return true;
  } catch (err) {
    console.log(err);
  }

  return false;
}
