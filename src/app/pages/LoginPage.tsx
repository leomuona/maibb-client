import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthenticatedUser } from "../Root";
import { login } from "../auth/login";
import { LoginForm } from "../forms/LoginForm";
import { ROUTES } from "../routes";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const authenticatedUser = useAuthenticatedUser();
  if (authenticatedUser) {
    // user has already logged in
    navigate(ROUTES.root);
  }

  return (
    <div>
      <h1>Kirjaudu sisään</h1>
      <LoginForm
        onSubmit={async (data) => {
          const result = await login(data.username, data.password);
          if (result) {
            navigate(ROUTES.root);
          }
        }}
      />
      <p>
        <Link to={ROUTES.root}>Takaisin etusivulle</Link>
      </p>
    </div>
  );
}
