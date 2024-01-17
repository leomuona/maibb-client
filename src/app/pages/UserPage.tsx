import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import { ROUTES } from "../routes";

export function UserPage(): JSX.Element | null {
  const { authenticatedUser } = useAuth();

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
