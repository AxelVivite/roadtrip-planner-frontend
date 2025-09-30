"use client";

import React from "react";

import Login from "@config/interfaces/in/login";

interface AuthContextType {
  token?: string;
  username?: string;
  setAuth: ({ token, username }: Login) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

interface Properties {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Properties) => {
  const [token, setToken] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("username");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUsername(savedUser);
    setIsLoading(false);
  }, []);

  const setAuth = ({ token, username }: Login) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setToken(undefined);
        setUsername(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      })
      .catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{ token, username, setAuth, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
