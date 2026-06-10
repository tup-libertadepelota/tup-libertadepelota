import React, { createContext, useState, useContext } from "react";
import * as Sentry from "@sentry/react";
import { trackEvent } from "../utils/analytics.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("session") === "true";
  });
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData = null) => {
    const nextUser = userData ?? { name: "Usuario", email: "usuario@example.com" };
    sessionStorage.setItem("session", "true");
    sessionStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    setIsAuthenticated(true);

    Sentry.setUser({ email: nextUser.email, username: nextUser.name });
    trackEvent("login_success", { method: "local", email: nextUser.email });

    Sentry.withScope((scope) => {
      scope.setUser({ email: nextUser.email, username: nextUser.name });
      scope.setExtra("login_method", "local");
      scope.setExtra("source", "TP9 analytics");
      Sentry.captureException(new Error(`Sentry test error for ${nextUser.email}`));
    });
  };

  const logout = () => {
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    Sentry.setUser(null);
    trackEvent("logout", { method: "local" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}
