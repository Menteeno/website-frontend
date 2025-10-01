"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSurvey_destroyMutation } from "@/services/menteenoApi.generated";
import { format } from "date-fns";
import {
  BarChart3,
  Calendar,
  Edit,
  Eye,
  MoreVertical,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface SurveyCardProps {
  survey: {
    id: string;
    title: string;
    unique_link_slug: string;
    is_active: number;
    created_at: string | null;
    updated_at: string | null;
    questions?: Array<{
      id: string;
      question_text: string;
      question_type: string;
    }>;
  };
  onRefresh: () => void;
}

export function SurveyCard({ survey, onRefresh }: SurveyCardProps) {
  const [deleteSurvey, { isLoading: isDeleting }] = useSurvey_destroyMutation();
  const [isDeletingState, setIsDeletingState] = useState(false);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this survey? This action cannot be undone."
      )
    ) {
      setIsDeletingState(true);
      try {
        await deleteSurvey({
          path: { survey: survey.id },
        }).unwrap();
        onRefresh();
      } catch (error) {
        console.error("Failed to delete survey:", error);
        alert("Failed to delete survey. Please try again.");
      } finally {
        setIsDeletingState(false);
      }
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/survey/${survey.unique_link_slug}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const isActive = survey.is_active === 1;
  const questionCount = survey.questions?.length || 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-2">
              {survey.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {survey.created_at &&
                format(new Date(survey.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isActive ? "success" : "secondary"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    window.open(`/survey/${survey.unique_link_slug}`, "_blank")
                  }
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting || isDeletingState}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              <span>{questionCount} questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>0 responses</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() =>
              window.open(`/survey/${survey.unique_link_slug}`, "_blank")
            }
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
