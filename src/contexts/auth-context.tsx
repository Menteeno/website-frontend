"use client";

import type { Auth, User } from "@/types/common";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends Auth {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    isAuthenticated: false,
  });

  const login = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
    });
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
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error("Failed to parse saved auth state:", error);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
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
