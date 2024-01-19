import { Global, ThemeProvider } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useOutletContext } from "react-router-dom";
import { AuthenticatedUser } from "./models/authenticatedUser";
import { Loader } from "./pages/Loader";
import { authenticatedUserQuery } from "./queries/authenticatedUserQuery";
import { darkTheme } from "./theme/theme";

export function Root(): JSX.Element {
  const { data: authenticatedUser, isLoading } = useQuery(
    authenticatedUserQuery,
  );

  return (
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
      {isLoading ? (
        <Loader />
      ) : (
        <Outlet context={createRootContext(authenticatedUser ?? null)} />
      )}
    </ThemeProvider>
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
