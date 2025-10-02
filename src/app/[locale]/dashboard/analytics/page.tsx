"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useSurvey_indexQuery } from "@/services/menteenoApi.generated";
import { BarChart3, Calendar, FileText, TrendingUp, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  );
}

function AnalyticsContent() {
  const { t } = useTranslation();
  const {
    data: surveysData,
    isLoading: surveysLoading,
    error: surveysError,
  } = useSurvey_indexQuery({});

  const surveys = surveysData?.data || [];

  if (surveysLoading) {
    return <AnalyticsSkeleton />;
  }

  if (surveysError) {
    return <AnalyticsError />;
  }

  // Calculate analytics data
  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter((s: any) => s.is_active).length;
  const totalResponses = 1234; // Mock data - replace with real data
  const completionRate = 85; // Mock data - replace with real data

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("dashboard.sidebar.analytics")}
          </h1>
          <p className="text-muted-foreground">{t("dashboard.overview")}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t("dashboard.stats.total_surveys")}
            value={totalSurveys.toString()}
            description={t("dashboard.stats.total_surveys")}
            icon={FileText}
            trend="+12%"
          />
          <StatsCard
            title={t("dashboard.stats.active_surveys")}
            value={activeSurveys.toString()}
            description={t("dashboard.stats.active_surveys")}
            icon={BarChart3}
            trend="+5%"
          />
          <StatsCard
            title={t("dashboard.stats.total_responses")}
            value={totalResponses.toString()}
            description={t("dashboard.stats.total_responses")}
            icon={Users}
            trend="+8%"
          />
          <StatsCard
            title={t("dashboard.stats.completion_rate")}
            value={`${completionRate}%`}
            description={t("dashboard.stats.completion_rate")}
            icon={TrendingUp}
            trend="+15%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Response Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("dashboard.analytics.response_trends")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                {t("dashboard.analytics.chart_placeholder")}
              </div>
            </CardContent>
          </Card>

          {/* Survey Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t("dashboard.analytics.survey_performance")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                {t("dashboard.analytics.chart_placeholder")}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t("dashboard.analytics.recent_activity")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surveys.slice(0, 5).map((survey: any, index: number) => (
                <div
                  key={survey.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{survey.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("dashboard.analytics.created")}{" "}
                        {new Date(survey.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.floor(Math.random() * 100)}{" "}
                      {t("dashboard.analytics.responses")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("dashboard.analytics.this_week")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsError() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                {t("common.error")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("common.error_description")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
