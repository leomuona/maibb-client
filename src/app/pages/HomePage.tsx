import { Link } from "react-router-dom";
import { useRootContext } from "../Root";
import { ROUTES } from "../routes";

export function HomePage(): JSX.Element {
  const { authenticatedUser } = useRootContext();

  const welcomeText = authenticatedUser
    ? `Moikkulis ${authenticatedUser.name}!`
    : "Tervetuloa!";
  const isAuthenticated = !!authenticatedUser;

  return (
    <div>
      <h1>Etusivu</h1>
      <p>{welcomeText}</p>
      {!isAuthenticated && (
        <>
          <p>
            <Link to={ROUTES.login}>Kirjaudu sisään</Link>
          </p>
          <p>
            <Link to={ROUTES.register}>Rekisteröidy</Link>
          </p>
        </>
      )}
      {isAuthenticated && (
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
