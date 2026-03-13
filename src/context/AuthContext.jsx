import React, { createContext, useContext, useMemo, useState } from "react";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, authApi } from "../services/api";

const AuthContext = createContext(null);

const parseStoredUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY) || "");
  const [user, setUser] = useState(parseStoredUser());

  const persistAuth = (nextToken, nextUser) => {
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const clearAuth = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken("");
    setUser(null);
  };

  const login = async ({ email, password }) => {
    const response = await authApi.login({ email, password });
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const register = async ({ name, email, password }) => {
    const response = await authApi.register({ name, email, password });
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout: clearAuth,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
