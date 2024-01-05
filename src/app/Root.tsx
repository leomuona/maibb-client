import { StrictMode, Suspense } from "react";
import {
  Await,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

import { Global, ThemeProvider } from "@emotion/react";
import { RootLoaderReturnType } from "./loaders/rootLoader";
import { AuthenticatedUser } from "./models/authenticatedUser";
import { Loader } from "./pages/Loader";
import { darkTheme } from "./theme/theme";

export function Root(): JSX.Element {
  const { authenticatedUser: authenticatedUserPromise } =
    useLoaderData() as RootLoaderReturnType;

  return (
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <Global
          styles={(theme) => ({
            html: {
              boxSizing: "border-box",
            },
            "*, *:before, *:after": {
              boxSizing: "inherit",
            },
            body: {
              margin: 0,
              padding: theme.spacing(2),
              paddingBottom: theme.spacing(8),
              fontFamily: theme.fontFamilies.sans,
              color: theme.colors.text,
              backgroundColor: theme.colors.appBackground,
            },
            a: {
              textDecoration: "none",
            },
          })}
        />
        <Suspense fallback={<Loader />}>
          <Await resolve={authenticatedUserPromise}>
            {(
              resolvedAuthenticatedUser: Awaited<
                typeof authenticatedUserPromise
              >,
            ) => (
              <Outlet context={createRootContext(resolvedAuthenticatedUser)} />
            )}
          </Await>
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  );
}

function createRootContext(
  authenticatedUser: AuthenticatedUser | null,
): RootContext {
  return {
    authenticatedUser,
  };
}

export type RootContext = {
  authenticatedUser: AuthenticatedUser | null;
};

export function useRootContext(): RootContext {
  return useOutletContext<RootContext>();
}

export function useAuthenticatedUser(): AuthenticatedUser | null {
  const { authenticatedUser } = useOutletContext<RootContext>();
  return authenticatedUser;
}
