import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRootContext } from "../Root";
import { FormData, RegisterForm } from "../forms/RegisterForm";
import { ROUTES } from "../routes";
import { registerUser } from "../user/register";

export function RegisterPage(): JSX.Element {
  const { authenticatedUser } = useRootContext();
  const navigate = useNavigate();

  if (authenticatedUser) {
    // user has already logged in
    return <Navigate to={ROUTES.root} />;
  }

  const doRegister = async (formData: FormData) => {
    const success = await registerUser({
      name: formData.name,
      username: formData.username,
      password: formData.password,
    });
    if (success) {
      // TODO: success toast
      navigate(ROUTES.login);
    }
    // TODO: error message
  };

  return (
    <div>
      <h1>Rekisteröidy käyttäjäksi</h1>
      <RegisterForm onSubmit={async (data) => await doRegister(data)} />
      <p>
        <Link to={ROUTES.root}>Takaisin etusivulle</Link>
      </p>
    </div>
  );
}
