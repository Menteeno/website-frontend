"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { useV1_auth_userQuery } from "@/services/menteenoApi.generated";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user: authUser } = useAuth();
  const { data: userData, isLoading, error } = useV1_auth_userQuery({});

  // Use API data if available, fallback to auth context
  const user = userData?.data || authUser;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Error Loading User Data
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Failed to fetch user information from the API.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to your Dashboard!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                User Information
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {user?.name || "Not provided"}
                </p>
                <p>
                  <strong>First Name:</strong>{" "}
                  {user?.first_name ? String(user.first_name) : "Not provided"}
                </p>
                <p>
                  <strong>Last Name:</strong>{" "}
                  {user?.last_name ? String(user.last_name) : "Not provided"}
                </p>
                <p>
                  <strong>Mobile:</strong> {user?.mobile || "Not provided"}
                </p>
                <p>
                  <strong>Mobile Verified:</strong>{" "}
                  <span
                    className={
                      user?.is_mobile_verified
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {user?.is_mobile_verified ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  <strong>Avatar:</strong>{" "}
                  {user?.avatar_url ? (
                    <img
                      src={String(user.avatar_url)}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full inline-block ml-2"
                    />
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                Authentication Status
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Authenticated
                  </span>
                </p>
                <p>
                  <strong>API Status:</strong>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Connected
                  </span>
                </p>
                <p>
                  <strong>User ID:</strong> {user?.id || "Not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              API Integration Status
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>✅ Redux Toolkit Query integrated</p>
              <p>✅ User API endpoint connected</p>
              <p>✅ Phone number authentication working</p>
              <p>✅ JWT token management implemented</p>
              <p>✅ Protected routes configured</p>
              <p>✅ Logout functionality available</p>
              <p>✅ Real-time user data fetching</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
