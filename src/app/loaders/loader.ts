import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router-dom";

export type Loader = (queryClient: QueryClient) => LoaderFunction;
