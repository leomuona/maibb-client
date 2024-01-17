import { Link } from "react-router-dom";
import { useAuth } from "../authProvider";
import { ROUTES } from "../routes";

export function HomePage(): JSX.Element {
  const { authenticatedUser } = useAuth();

  const welcomeText = authenticatedUser
    ? `Moikkulis ${authenticatedUser.name}!`
    : "Tervetuloa!";
  const showLoginLink = !authenticatedUser;
  const showAuthenticatedLinks = !!authenticatedUser;

  return (
    <div>
      <h1>Etusivu</h1>
      <p>{welcomeText}</p>
      {showLoginLink && (
        <p>
          <Link to={ROUTES.login}>Kirjaudu sisään</Link>
        </p>
      )}
      {showAuthenticatedLinks && (
        <>
          <p>
            <Link to={ROUTES.user}>Käyttäjäsivulle</Link>
          </p>
          <p>
            <Link to={ROUTES.logout}>Kirjaudu ulos</Link>
          </p>
        </>
      )}
    </div>
  );
}
