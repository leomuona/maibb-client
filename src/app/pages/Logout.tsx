import { Navigate } from "react-router-dom";
import { logout } from "../auth/logout";
import { ROUTES } from "../routes";

export function Logout(): JSX.Element {
  logout();

  return <Navigate to={ROUTES.root} replace />;
}
