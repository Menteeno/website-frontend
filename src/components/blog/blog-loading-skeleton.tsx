"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface BlogLoadingSkeletonProps {
  count?: number;
  variant?: "default" | "featured" | "compact";
}

export const BlogLoadingSkeleton = memo<BlogLoadingSkeletonProps>(
  ({ count = 6, variant = "default" }) => {
    const getCardClasses = () => {
      const baseClasses =
        "h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse";

      switch (variant) {
        case "featured":
          return `${baseClasses} ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-white`;
        case "compact":
          return baseClasses;
        default:
          return baseClasses;
      }
    };

    const getImageHeight = () => {
      switch (variant) {
        case "featured":
          return "h-44";
        case "compact":
          return "h-36";
        default:
          return "h-40";
      }
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className={getCardClasses()}>
            {/* Image Skeleton */}
            <div
              className={`relative w-full ${getImageHeight()} overflow-hidden`}
            >
              <Skeleton className="w-full h-full" />
              {/* Category Badge Skeleton on Image */}
              <div className="absolute top-3 left-3">
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              {variant === "featured" && (
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              )}
            </div>

            <CardHeader className="p-4 pb-2">
              {/* Title Skeleton */}
              <div className="space-y-2 mb-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Excerpt Skeleton */}
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>

            {/* Tags Skeleton */}
            <CardContent className="px-4 py-2">
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </CardContent>

            {/* Footer Skeleton */}
            <CardFooter className="px-4 py-3 pt-2 mt-auto">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
);

BlogLoadingSkeleton.displayName = "BlogLoadingSkeleton";
