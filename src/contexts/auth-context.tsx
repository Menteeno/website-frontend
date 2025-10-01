"use client";

import type { Auth, User } from "@/types/common";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends Auth {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  token: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    isAuthenticated: false,
  });
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user: User, authToken: string) => {
    const newAuth = {
      user,
      isAuthenticated: true,
    };
    setAuth(newAuth);
    setToken(authToken);

    // Save to localStorage immediately
    localStorage.setItem("auth", JSON.stringify(newAuth));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    const newAuth = {
      user: null,
      isAuthenticated: false,
    };
    setAuth(newAuth);
    setToken(null);

    // Clear localStorage immediately
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
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
    const initializeAuth = () => {
      const savedAuth = localStorage.getItem("auth");
      const savedToken = localStorage.getItem("token");

      if (savedAuth && savedToken) {
        try {
          const parsedAuth = JSON.parse(savedAuth);
          // Only restore if we have both auth data and token
          if (parsedAuth.user && parsedAuth.isAuthenticated) {
            setAuth(parsedAuth);
            setToken(savedToken);
            console.log("Auth state restored from localStorage");
          }
        } catch (error) {
          console.error("Failed to parse saved auth state:", error);
          localStorage.removeItem("auth");
          localStorage.removeItem("token");
        }
      }

      // Set loading to false after initialization
      setIsLoading(false);
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      initializeAuth();
    } else {
      setIsLoading(false);
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
        isLoading,
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
