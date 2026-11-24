import { createContext } from "react";

export interface AuthContextValue {
  user: string | null;
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
