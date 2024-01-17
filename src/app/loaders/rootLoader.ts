import { QueryClient } from "@tanstack/react-query";
import { defer } from "react-router-dom";
import { handleAuthToken } from "../auth/token";
import { AuthState } from "../authProvider";
import { Loader } from "./loader";

export const rootLoader: Loader =
  (auth: AuthState, queryClient: QueryClient) => async () =>
    defer(loadData(auth, queryClient));

export type RootLoaderReturnType = ReturnType<typeof loadData>;

function loadData(auth: AuthState, queryClient: QueryClient) {
  return {
    authentication: loadAuthentication(auth, queryClient),
  };
}

async function loadAuthentication(auth: AuthState, queryClient: QueryClient) {
  await handleAuthToken(auth, queryClient);
  return true;
}
