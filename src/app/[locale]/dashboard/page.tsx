"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();

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
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Mobile:</strong> {user?.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "Not provided"}
                </p>
                <p>
                  <strong>Member since:</strong>{" "}
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Unknown"}
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
                  <strong>Mobile Verified:</strong>{" "}
                  {user?.mobile_verified_at ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Email Verified:</strong>{" "}
                  {user?.email_verified_at ? "Yes" : "No"}
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
              <p>✅ Phone number authentication working</p>
              <p>✅ JWT token management implemented</p>
              <p>✅ Protected routes configured</p>
              <p>✅ Logout functionality available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
