import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router-dom";
import { AuthState } from "../authProvider";

export type Loader = (
  auth: AuthState,
  queryClient: QueryClient,
) => LoaderFunction;
