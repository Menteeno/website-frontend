"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SurveyCard } from "@/components/dashboard/survey-card";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useSurvey_indexQuery } from "@/services/menteenoApi.generated";
import { FileText, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function SurveysPage() {
  return (
    <ProtectedRoute>
      <SurveysContent />
    </ProtectedRoute>
  );
}

function SurveysContent() {
  const { t } = useTranslation();
  const {
    data: surveysData,
    isLoading: surveysLoading,
    error: surveysError,
    refetch,
  } = useSurvey_indexQuery({});
  const [searchTerm, setSearchTerm] = useState("");

  const surveys = surveysData?.data || [];

  // Filter surveys based on search term
  const filteredSurveys = surveys.filter(
    (survey: any) =>
      survey.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (surveysLoading) {
    return <SurveysSkeleton />;
  }

  if (surveysError) {
    return <SurveysError onRetry={refetch} />;
  }

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
              {t("dashboard.sidebar.surveys")}
            </h1>
            <p className="text-muted-foreground">{t("dashboard.overview")}</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard.create_survey")}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("common.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>
              <Button variant="outline" size="sm">
                {t("common.filter")}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Surveys Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {t("dashboard.recent_surveys")} ({filteredSurveys.length})
            </h2>
          </div>

          {filteredSurveys.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm
                    ? t("common.no_results")
                    : t("dashboard.no_surveys")}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm
                    ? t("common.no_results_description")
                    : t("dashboard.no_surveys_description")}
                </p>
                {!searchTerm && (
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("dashboard.create_survey")}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurveys.map((survey: any) => (
                <SurveyCard
                  key={survey.id}
                  survey={survey}
                  onRefresh={refetch}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SurveysSkeleton() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="h-16 bg-muted rounded mb-6"></div>
          <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SurveysError({ onRetry }: { onRetry: () => void }) {
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
              <Button variant="outline" onClick={onRetry}>
                {t("common.try_again")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
