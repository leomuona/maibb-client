import { RegisterUserData, registerUserRequest } from "../api/user";

export async function registerUser(data: RegisterUserData): Promise<boolean> {
  try {
    await registerUserRequest(data);
    return true;
  } catch (_err) {
    // maybe username already exists?
  }

  return false;
}
