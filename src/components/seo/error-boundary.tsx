"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SEOErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("SEO Error Boundary caught an error:", error, errorInfo);
    }

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        this.props.fallback || (
          <div className="hidden">
            {/* Silent fallback - SEO components failed to load */}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component for SEO elements that might cause hydration issues
 */
export function SEOSafeWrapper({ children }: { children: ReactNode }) {
  return (
    <SEOErrorBoundary
      fallback={<div className="hidden" />}
      onError={(error) => {
        // Log hydration-related errors silently
        if (
          error.message.includes("hydration") ||
          error.message.includes("Hydration")
        ) {
          console.warn(
            "Hydration mismatch detected in SEO component:",
            error.message
          );
        }
      }}
    >
      {children}
    </SEOErrorBoundary>
  );
}
