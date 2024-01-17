import { createContext, useContext, useMemo, useState } from "react";
import { AuthenticatedUser } from "./models/authenticatedUser";

export type AuthToken = {
  token: string;
  exp: number;
};

export type AuthState = {
  token: AuthToken | null;
  setToken: (value: AuthToken | null) => void;
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: (value: AuthenticatedUser | null) => void;
  refresh: boolean;
  setRefresh: (value: boolean) => void;
};

const AuthContext = createContext<AuthState>({
  token: null,
  setToken: () => {},
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
  refresh: true,
  setRefresh: () => {},
});

type Props = {
  children?: React.ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null);
  const [refresh, setRefresh] = useState(true);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      authenticatedUser,
      setAuthenticatedUser,
      refresh,
      setRefresh,
    }),
    [token, authenticatedUser, refresh],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used inside AuthProvider");
  }
  return context;
};
