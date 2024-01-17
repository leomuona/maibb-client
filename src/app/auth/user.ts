import { QueryClient } from "@tanstack/react-query";
import { authenticatedUserRequest } from "../api/authentication";

export async function fetchAuthenticatedUser(
  token: string,
  queryClient: QueryClient,
) {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["authenticatedUser", token],
      queryFn: async () => await authenticatedUserRequest(token),
      staleTime: 600000, // 10 minutes
    });
    return user;
  } catch (_err) {
    return null;
  }
}
