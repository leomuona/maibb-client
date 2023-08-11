import { StrictMode, Suspense } from "react";
import {
  Await,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

import { RootLoaderReturnType } from "./loaders/rootLoader";
import { AuthenticatedUser } from "./models/authenticatedUser";
import { Loader } from "./pages/Loader";

export function Root(): JSX.Element {
  const { authenticatedUser: authenticatedUserPromise } =
    useLoaderData() as RootLoaderReturnType;

  return (
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <Await resolve={authenticatedUserPromise}>
          {(
            resolvedAuthenticatedUser: Awaited<typeof authenticatedUserPromise>,
          ) => (
            <Outlet context={createRootContext(resolvedAuthenticatedUser)} />
          )}
        </Await>
      </Suspense>
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
