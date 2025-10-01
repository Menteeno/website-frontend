"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useSurvey_indexQuery } from "@/services/menteenoApi.generated";
import { Download, FileText, Search, Users } from "lucide-react";
import { useState } from "react";

export default function ResponsesPage() {
  return (
    <ProtectedRoute>
      <ResponsesContent />
    </ProtectedRoute>
  );
}

function ResponsesContent() {
  const { t } = useTranslation();
  const {
    data: surveysData,
    isLoading: surveysLoading,
    error: surveysError,
  } = useSurvey_indexQuery({});
  const [searchTerm, setSearchTerm] = useState("");

  const surveys = surveysData?.data || [];

  if (surveysLoading) {
    return <ResponsesSkeleton />;
  }

  if (surveysError) {
    return <ResponsesError />;
  }

  // Mock responses data - replace with real API call
  const mockResponses = [
    {
      id: 1,
      surveyTitle: "نظرسنجی رضایت مشتری",
      respondentEmail: "user1@example.com",
      submittedAt: "2024-01-15T10:30:00Z",
      status: "completed",
      score: 4.5,
    },
    {
      id: 2,
      surveyTitle: "ارزیابی محصول",
      respondentEmail: "user2@example.com",
      submittedAt: "2024-01-14T15:45:00Z",
      status: "completed",
      score: 3.8,
    },
    {
      id: 3,
      surveyTitle: "نظرسنجی خدمات",
      respondentEmail: "user3@example.com",
      submittedAt: "2024-01-13T09:20:00Z",
      status: "incomplete",
      score: null,
    },
  ];

  const filteredResponses = mockResponses.filter(
    (response) =>
      response.surveyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.respondentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {t("dashboard.sidebar.responses")}
            </h1>
            <p className="text-muted-foreground">{t("dashboard.overview")}</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            {t("dashboard.responses.export")}
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

        {/* Responses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t("dashboard.responses.all_responses")} (
              {filteredResponses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredResponses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm
                    ? t("common.no_results")
                    : t("dashboard.responses.no_responses")}
                </h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm
                    ? t("common.no_results_description")
                    : t("dashboard.responses.no_responses_description")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResponses.map((response) => (
                  <div
                    key={response.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{response.surveyTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {response.respondentEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(response.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {response.status === "completed"
                            ? t("dashboard.responses.completed")
                            : t("dashboard.responses.incomplete")}
                        </p>
                        {response.score && (
                          <p className="text-xs text-muted-foreground">
                            {t("dashboard.responses.score")}: {response.score}/5
                          </p>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        {t("dashboard.responses.view")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResponsesSkeleton() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="h-16 bg-muted rounded mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

function ResponsesError() {
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
