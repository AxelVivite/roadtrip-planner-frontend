"use client";

import React from "react";

import Login from "@config/interfaces/in/login";

interface AuthContextType {
  accessToken?: string;
  username?: string;
  setAuth: ({ accessToken, username }: Login) => void;
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
  const [accessToken, setAccessToken] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("username");
    if (savedToken) setAccessToken(savedToken);
    if (savedUser) setUsername(savedUser);
    setIsLoading(false);
  }, []);

  const setAuth = ({ accessToken, username }: Login) => {
    setAccessToken(accessToken);
    setUsername(username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        setAccessToken(undefined);
        setUsername(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
      })
      .catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, username, setAuth, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
