import { QueryClient } from "@tanstack/react-query";
import { RouteObject } from "react-router-dom";

import { Root } from "./Root";
import { rootLoader } from "./loaders/rootLoader";
import { ErrorPage } from "./pages/ErrorPage";
import { ROUTES } from "./routes";

export function createRoutes(queryClient: QueryClient): RouteObject[] {
  const routes = [
    {
      path: ROUTES.root,
      loader: rootLoader(queryClient),
      element: <Root />,
      errorElement: <ErrorPage />,
    },
  ];

  return routes;
}
