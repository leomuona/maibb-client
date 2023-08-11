import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Hupsista!</h1>
        <p>{`${error.status}: ${error.statusText}`}</p>
      </div>
    );
  }

  console.log(error);

  return (
    <div>
      <h1>Hupsista!</h1>
      <p>Jotain meni vikaan.</p>
    </div>
  );
}
