import useLogin from "@/hooks/useLogin";
import { createContext, useContext, useMemo } from "react";
import type { AuthContextType } from "../../types/AuthContext";

const AuthContext = createContext({ initialized: false } as AuthContextType);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context.initialized === false) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { logoutHandler, loginHandler, user, error } = useLogin();

  const value = useMemo(
    () => ({ user, logoutHandler, loginHandler, error, initialized: true }),
    [user, loginHandler, error, logoutHandler]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthContextProvider };
