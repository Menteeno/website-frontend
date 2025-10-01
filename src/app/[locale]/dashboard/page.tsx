"use client";

import { CreateSurveyDialog } from "@/components/dashboard/create-survey-dialog";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SurveyCard } from "@/components/dashboard/survey-card";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useSurvey_indexQuery } from "@/services/menteenoApi.generated";
import { BarChart3, Calendar, FileText, Plus, Users } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user: authUser } = useAuth();
  const {
    data: surveysData,
    isLoading: surveysLoading,
    error: surveysError,
    refetch,
  } = useSurvey_indexQuery({});
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);

  // Use auth context data
  const user = authUser || null;
  const surveys = surveysData?.data || [];

  if (surveysLoading) {
    return <DashboardSkeleton />;
  }

  if (surveysError) {
    return <DashboardError />;
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {String(user?.first_name || user?.name || "User")}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your surveys today.
          </p>
        </div>
        <Button onClick={() => setCreateSurveyOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Survey
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Surveys"
          value={surveys.length.toString()}
          description="All time surveys"
          icon={FileText}
          trend="+12%"
        />
        <StatsCard
          title="Active Surveys"
          value={surveys.filter((s: any) => s.is_active).length.toString()}
          description="Currently active"
          icon={BarChart3}
          trend="+5%"
        />
        <StatsCard
          title="Total Responses"
          value="1,234"
          description="Across all surveys"
          icon={Users}
          trend="+8%"
        />
        <StatsCard
          title="This Month"
          value="23"
          description="New surveys created"
          icon={Calendar}
          trend="+15%"
        />
      </div>

      {/* Recent Surveys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Surveys</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {surveysLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : surveysError ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  Failed to load surveys
                </p>
                <Button variant="outline" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : surveys.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No surveys yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by creating your first survey
              </p>
              <Button onClick={() => setCreateSurveyOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Survey
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey: any) => (
              <SurveyCard key={survey.id} survey={survey} onRefresh={refetch} />
            ))}
          </div>
        )}
      </div>

      {/* Create Survey Dialog */}
      <CreateSurveyDialog
        open={createSurveyOpen}
        onOpenChange={setCreateSurveyOpen}
        onSuccess={() => {
          refetch();
          setCreateSurveyOpen(false);
        }}
      />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded"></div>
          ))}
        </div>
        <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardError() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-muted-foreground mb-4">
              Failed to fetch user information from the API.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
