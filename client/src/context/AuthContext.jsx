import React, { createContext, useState, useContext } from "react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("session") === "true";
  })


  const login = () => {
    sessionStorage.setItem("session", "true");
    setIsAuthenticated(true);
  }

  const logout = () => {
    sessionStorage.removeItem("session");
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
