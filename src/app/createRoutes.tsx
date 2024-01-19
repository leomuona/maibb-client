import { QueryClient } from "@tanstack/react-query";
import { RouteObject } from "react-router-dom";
import { Root } from "./Root";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Logout } from "./pages/Logout";
import { UserPage } from "./pages/UserPage";
import { ROUTES } from "./routes";

export function createRoutes(_queryClient: QueryClient): RouteObject[] {
  const routes = [
    {
      path: ROUTES.root,
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ROUTES.login,
          element: <LoginPage />,
        },
        {
          path: ROUTES.logout,
          element: <Logout />,
        },
        {
          path: ROUTES.user,
          element: <UserPage />,
        },
      ],
    },
  ];

  return routes;
}
