"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { Component, type ReactNode } from "react";

interface BlogErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onRetry?: () => void;
}

interface BlogErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

export class BlogErrorBoundary extends Component<
  BlogErrorBoundaryProps,
  BlogErrorBoundaryState
> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: any) {
    console.error("Blog Error Boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onRetry?.();
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <BlogErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

interface BlogErrorFallbackProps {
  error?: Error | undefined;
  onRetry?: () => void;
}

function BlogErrorFallback({ error, onRetry }: BlogErrorFallbackProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === "fa";

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangleIcon className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-xl" dir={isRTL ? "rtl" : "ltr"}>
          {t("blog.error.failed_to_load")}
        </CardTitle>
        <CardDescription dir={isRTL ? "rtl" : "ltr"}>
          {error?.message || t("blog.error.server_error")}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={onRetry} className="gap-2">
          <RefreshCwIcon className="h-4 w-4" />
          {t("blog.error.retry")}
        </Button>
      </CardContent>
    </Card>
  );
}

// Hook for error handling
export function useBlogErrorHandler() {
  const { t } = useTranslation();

  const handleError = (error: unknown, context?: string) => {
    console.error(`Blog Error${context ? ` in ${context}` : ""}:`, error);

    // Here you could send error to monitoring service
    // Example: Sentry.captureException(error, { tags: { context } });
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "string") {
      return error;
    }

    return t("blog.error.server_error");
  };

  return {
    handleError,
    getErrorMessage,
  };
}
