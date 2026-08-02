"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { Bell, Lock, Save, User } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    firstName: String(user?.first_name || ""),
    lastName: String(user?.last_name || ""),
    email: String(user?.email || ""),
    mobile: String(user?.mobile || ""),
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
      showMobile: false,
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update user data
      updateUser({
        first_name: settings.firstName,
        last_name: settings.lastName,
        email: settings.email,
        mobile: settings.mobile,
      });

      // Here you would typically save settings to the backend
      console.log("Settings saved:", settings);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("dashboard.sidebar.settings")}
            </h1>
            <p className="text-muted-foreground">
              {t("dashboard.settings.description")}
            </p>
          </div>
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? t("common.saving") : t("common.save")}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("dashboard.settings.profile")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("auth.first_name")}</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("auth.last_name")}</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">{t("auth.mobile")}</Label>
                  <Input
                    id="mobile"
                    value={settings.mobile}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t("dashboard.settings.notifications")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.email_notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.email_notifications_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.push_notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.push_notifications_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.sms_notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.sms_notifications_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {t("dashboard.settings.privacy")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.public_profile")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.public_profile_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.profilePublic}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, profilePublic: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.show_email")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.show_email_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, showEmail: checked },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("dashboard.settings.show_mobile")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.settings.show_mobile_description")}
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showMobile}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, showMobile: checked },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
