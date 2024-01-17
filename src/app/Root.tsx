import { Global, ThemeProvider } from "@emotion/react";
import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import { RootLoaderReturnType } from "./loaders/rootLoader";
import { Loader } from "./pages/Loader";
import { darkTheme } from "./theme/theme";

export function Root(): JSX.Element {
  const { authentication } = useLoaderData() as RootLoaderReturnType;

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
      <Suspense fallback={<Loader />}>
        <Await resolve={authentication}>
          <Outlet />
        </Await>
      </Suspense>
    </ThemeProvider>
  );
}
