import { Link, Navigate } from "react-router-dom";
import { useRootContext } from "../Root";
import { ROUTES } from "../routes";

export function UserPage(): JSX.Element {
  const { authenticatedUser } = useRootContext();

  if (!authenticatedUser) {
    return <Navigate to={ROUTES.root} />;
  }

  return (
    <div>
      <h1>Käyttäjäsivu</h1>
      <ul>
        <li>nimi: {authenticatedUser.name}</li>
        <li>id: {authenticatedUser.id}</li>
      </ul>
      <p>
        <Link to={ROUTES.root}>Etusivulle</Link>
      </p>
    </div>
  );
}
