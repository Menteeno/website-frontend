import { RootState } from "@/store";
import {
  login,
  logout,
  restoreAuth,
  setLoading,
  updateUser,
} from "@/store/auth-slice";
import type { User } from "@/types/common";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedAuth = localStorage.getItem("auth");
        const savedToken = localStorage.getItem("token");

        if (savedAuth && savedToken) {
          const parsedAuth = JSON.parse(savedAuth);
          if (parsedAuth.user && parsedAuth.isAuthenticated) {
            dispatch(restoreAuth({ user: parsedAuth.user, token: savedToken }));
            console.log("Auth state restored from localStorage");
            return;
          }
        }
      } catch (error) {
        console.error("Failed to parse saved auth state:", error);
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
      }

      dispatch(setLoading(false));
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      initializeAuth();
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      auth.isAuthenticated &&
      auth.user &&
      auth.token
    ) {
      try {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: auth.user,
            isAuthenticated: auth.isAuthenticated,
          })
        );
        localStorage.setItem("token", auth.token);
      } catch (error) {
        console.error("Failed to save auth state to localStorage:", error);
      }
    }
  }, [auth.isAuthenticated, auth.user, auth.token]);

  const loginUser = useCallback(
    (user: User, token: string) => {
      dispatch(login({ user, token }));
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Failed to clear localStorage:", error);
      }
    }
  }, [dispatch]);

  const updateUserData = useCallback(
    (userData: Partial<User>) => {
      dispatch(updateUser(userData));
    },
    [dispatch]
  );

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    login: loginUser,
    logout: logoutUser,
    updateUser: updateUserData,
  };
}
