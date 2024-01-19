import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../auth/logout";
import { ROUTES } from "../routes";
import { Loader } from "./Loader";

export function Logout(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const doLogout = async () => {
    await logout(queryClient);
    // TODO: add some toast about successful logout
    setLoading(false);
  };

  useEffect(() => {
    doLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Navigate to={ROUTES.root} replace />;
}
