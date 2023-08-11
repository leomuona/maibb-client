import { QueryClient } from "@tanstack/react-query";
import { defer } from "react-router-dom";
import { Loader } from "./loader";

export const rootLoader: Loader = (queryClient: QueryClient) => async () =>
  defer(loadData(queryClient));

export type RootLoaderReturnType = ReturnType<typeof loadData>;

function loadData(queryClient: QueryClient) {
  return {
    authenticatedUser: getAuthenticatedUser(queryClient),
  };
}

async function getAuthenticatedUser(_queryClient: QueryClient) {
  // TODO
  return null;
}
