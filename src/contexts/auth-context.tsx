"use client";

import type { Auth, User } from "@/types/common";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends Auth {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    isAuthenticated: false,
  });
  const [token, setToken] = useState<string | null>(null);

  const login = (user: User, authToken: string) => {
    setAuth({
      user,
      isAuthenticated: true,
    });
    setToken(authToken);
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
    });
    setToken(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (auth.user) {
      setAuth({
        ...auth,
        user: { ...auth.user, ...userData },
      });
    }
  };

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    const savedToken = localStorage.getItem("token");

    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error("Failed to parse saved auth state:", error);
        localStorage.removeItem("auth");
      }
    }

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
