import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRootContext } from "../Root";
import { LoginForm } from "../forms/LoginForm";
import { ROUTES } from "../routes";
import { login } from "../user/login";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authenticatedUser } = useRootContext();

  if (authenticatedUser) {
    // user has already logged in
    return <Navigate to={ROUTES.root} />;
  }

  const doLogin = async (username: string, password: string) => {
    const result = await login(username, password, queryClient);
    if (result) {
      navigate(ROUTES.root);
    }
    // TODO: show error message if failed login
  };

  return (
    <div>
      <h1>Kirjaudu sisään</h1>
      <LoginForm
        onSubmit={async (data) => await doLogin(data.username, data.password)}
      />
      <p>
        <Link to={ROUTES.root}>Takaisin etusivulle</Link>
      </p>
    </div>
  );
}
