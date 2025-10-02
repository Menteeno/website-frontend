"use client";

import { lazy, Suspense } from "react";
import { BlogLoadingSkeleton } from "./blog-loading-skeleton";

// Lazy load heavy components
export const BlogListLazy = lazy(() => 
  import("./blog-list-optimized").then(module => ({ 
    default: module.BlogListOptimized 
  }))
);

export const BlogDetailLazy = lazy(() => 
  import("./blog-detail-optimized").then(module => ({ 
    default: module.BlogDetailOptimized 
  }))
);

export const BlogSidebarLazy = lazy(() => 
  import("./blog-sidebar").then(module => ({ 
    default: module.BlogSidebar 
  }))
);

// Wrapper components with Suspense
export function BlogListWithSuspense(props: any) {
  return (
    <Suspense fallback={<BlogLoadingSkeleton count={6} />}>
      <BlogListLazy {...props} />
    </Suspense>
  );
}

export function BlogDetailWithSuspense(props: any) {
  return (
    <Suspense fallback={<BlogLoadingSkeleton count={1} variant="compact" />}>
      <BlogDetailLazy {...props} />
    </Suspense>
  );
}

export function BlogSidebarWithSuspense(props: any) {
  return (
    <Suspense fallback={<div className="space-y-6">
      <div className="h-64 bg-muted rounded animate-pulse" />
      <div className="h-48 bg-muted rounded animate-pulse" />
    </div>}>
      <BlogSidebarLazy {...props} />
    </Suspense>
  );
}
