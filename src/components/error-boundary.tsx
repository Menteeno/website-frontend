"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="mb-4 flex justify-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
            <p className="mb-4 text-muted-foreground">
              We encountered an unexpected error. Please try again.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm font-medium">
                  Error Details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <Button onClick={this.handleRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error("Error caught by useErrorHandler:", error, errorInfo);
    // You can add additional error reporting here
  };
}
