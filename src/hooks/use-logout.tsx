"use client";

import { useAuth } from "@/contexts/auth-context";
import { useV1_auth_logoutMutation } from "@/services/menteenoApi.generated";
import { useRouter } from "next/navigation";

export function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  const [logoutMutation, { isLoading }] = useV1_auth_logoutMutation();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await logoutMutation({}).unwrap();
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Always perform local logout
      logout();
      router.push("/auth");
    }
  };

  return {
    logout: handleLogout,
    isLoggingOut: isLoading,
  };
}
