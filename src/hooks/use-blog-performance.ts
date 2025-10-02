"use client";

import type { BlogFilters, BlogPost } from "@/types/blog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Debounce hook for search
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Virtual scrolling hook for large lists
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleCount = Math.ceil(containerHeight / itemHeight) + 1;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);

  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
}

// Memoized search function
export function useBlogSearch(posts: BlogPost[]) {
  return useCallback(
    (query: string) => {
      if (!query.trim()) return posts;

      const searchTerm = query.toLowerCase();
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchTerm)
          ) ||
          post.author.name.toLowerCase().includes(searchTerm)
      );
    },
    [posts]
  );
}

// Memoized filter function
export function useBlogFilter(posts: BlogPost[]) {
  return useCallback(
    (filters: BlogFilters) => {
      let filteredPosts = [...posts];

      if (filters.category) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category.slug === filters.category
        );
      }

      if (filters.tag) {
        filteredPosts = filteredPosts.filter((post) =>
          post.tags.some((tag) => tag.slug === filters.tag)
        );
      }

      if (filters.author) {
        filteredPosts = filteredPosts.filter(
          (post) => post.author.id === filters.author
        );
      }

      if (filters.featured) {
        filteredPosts = filteredPosts.filter((post) => post.featured);
      }

      if (filters.status) {
        filteredPosts = filteredPosts.filter(
          (post) => post.status === filters.status
        );
      }

      if (filters.dateFrom) {
        filteredPosts = filteredPosts.filter(
          (post) => new Date(post.publishedAt) >= new Date(filters.dateFrom!)
        );
      }

      if (filters.dateTo) {
        filteredPosts = filteredPosts.filter(
          (post) => new Date(post.publishedAt) <= new Date(filters.dateTo!)
        );
      }

      return filteredPosts;
    },
    [posts]
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, options]);

  return targetRef;
}

// Performance monitoring hook
export function useBlogPerformance() {
  const startTime = useRef<number>(0);

  const startTiming = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const endTiming = useCallback((label: string) => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    console.log(`${label} took ${duration.toFixed(2)}ms`);
    return duration;
  }, []);

  return { startTiming, endTiming };
}

// Image lazy loading hook
export function useImageLazyLoading() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const loadImage = useCallback(
    (src: string) => {
      if (loadedImages.has(src)) return;

      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
      img.src = src;
    },
    [loadedImages]
  );

  const isImageLoaded = useCallback(
    (src: string) => {
      return loadedImages.has(src);
    },
    [loadedImages]
  );

  return { loadImage, isImageLoaded };
}

// Cache management hook
export function useBlogCache() {
  const cache = useRef<Map<string, { data: any; timestamp: number }>>(
    new Map()
  );
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const getCached = useCallback((key: string) => {
    const item = cache.current.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_DURATION) {
      cache.current.delete(key);
      return null;
    }

    return item.data;
  }, []);

  const setCached = useCallback((key: string, data: any) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  return { getCached, setCached, clearCache };
}
