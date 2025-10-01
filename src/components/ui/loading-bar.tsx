"use client";

import { useEffect, useState } from "react";

interface LoadingBarProps {
  isLoading: boolean;
  className?: string;
}

export function LoadingBar({ isLoading, className = "" }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      // Simulate GitHub's loading progression
      const timer1 = setTimeout(() => setProgress(30), 100);
      const timer2 = setTimeout(() => setProgress(60), 200);
      const timer3 = setTimeout(() => setProgress(90), 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      // Complete the loading
      setProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div
        className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          transform: `translateX(${progress === 100 ? "0" : "-100%"})`,
          transition:
            progress === 100
              ? "width 0.2s ease-out, transform 0.2s ease-out"
              : "width 0.3s ease-out",
        }}
      />
    </div>
  );
}

// Alternative GitHub-style loading bar with more accurate styling
export function GitHubLoadingBar({
  isLoading,
  className = "",
}: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      // GitHub-style loading progression
      const intervals = [
        { progress: 20, delay: 50 },
        { progress: 40, delay: 100 },
        { progress: 60, delay: 150 },
        { progress: 80, delay: 200 },
        { progress: 90, delay: 250 },
      ];

      const timers = intervals.map(({ progress, delay }) =>
        setTimeout(() => setProgress(progress), delay)
      );

      return () => timers.forEach(clearTimeout);
    } else {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className={`github-loading-bar ${className}`}>
      <div
        className="github-loading-progress"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
