import { Link } from "react-router-dom";
import { useAuthenticatedUser } from "../Root";
import { ROUTES } from "../routes";

export function HomePage(): JSX.Element {
  const authenticatedUser = useAuthenticatedUser();

  const welcomeText = authenticatedUser
    ? `Moikkulis ${authenticatedUser.name}!`
    : "Tervetuloa!";
  const showLoginLink = !authenticatedUser;
  const showLogoutLink = !!authenticatedUser;

  return (
    <div>
      <h1>Etusivu</h1>
      <p>{welcomeText}</p>
      {showLoginLink && (
        <p>
          <Link to={ROUTES.login}>Kirjaudu sisään</Link>
        </p>
      )}
      {showLogoutLink && (
        <p>
          <Link to={ROUTES.logout}>Kirjaudu ulos</Link>
        </p>
      )}
    </div>
  );
}
