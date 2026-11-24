import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { clearSession, getSessionUser, saveSession } from "../../../lib/auth";

/** Provee la sesión del administrador a toda la aplicación. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(getSessionUser);

  const login = useCallback((token: string, username: string) => {
    saveSession(token, username);
    setUser(username);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
