import { QueryClient } from "@tanstack/react-query";
import { defer } from "react-router-dom";
import { authenticatedUserRequest } from "../api/authentication";
import { getToken } from "../auth/token";
import { Loader } from "./loader";

export const rootLoader: Loader = (queryClient: QueryClient) => async () =>
  defer(loadData(queryClient));

export type RootLoaderReturnType = ReturnType<typeof loadData>;

function loadData(queryClient: QueryClient) {
  return {
    authenticatedUser: getAuthenticatedUser(queryClient),
  };
}

async function getAuthenticatedUser(queryClient: QueryClient) {
  try {
    const token = await getToken();

    return await queryClient.fetchQuery({
      queryKey: ["authenticatedUser", token],
      queryFn: async () => await authenticatedUserRequest(token),
      staleTime: 600000, // 10 minutes
    });
  } catch (_e) {
    return null;
  }
}
