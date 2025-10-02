"use client";

import { useCallback } from "react";

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface EcommerceEvent {
  event_name: string;
  currency: string;
  value: number;
  items: Array<{
    item_id: string;
    item_name: string;
    item_category: string;
    quantity: number;
    price: number;
  }>;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters,
      });
    }
  }, []);

  const trackPageView = useCallback(
    (page_path: string, page_title?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", {
          page_path,
          page_title: page_title || document.title,
          page_location: window.location.href,
        });
      }
    },
    []
  );

  const trackEcommerceEvent = useCallback((event: EcommerceEvent) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.event_name, {
        currency: event.currency,
        value: event.value,
        items: event.items,
      });
    }
  }, []);

  const trackCourseEnrollment = useCallback(
    (courseId: string, courseName: string, price: number) => {
      trackEcommerceEvent({
        event_name: "purchase",
        currency: "USD",
        value: price,
        items: [
          {
            item_id: courseId,
            item_name: courseName,
            item_category: "Course",
            quantity: 1,
            price: price,
          },
        ],
      });
    },
    [trackEcommerceEvent]
  );

  const trackBlogView = useCallback(
    (blogTitle: string, blogCategory: string) => {
      trackEvent({
        action: "view_blog_post",
        category: "Blog",
        label: blogTitle,
        custom_parameters: {
          blog_category: blogCategory,
          content_type: "blog_post",
        },
      });
    },
    [trackEvent]
  );

  const trackContactForm = useCallback(
    (formType: "contact" | "newsletter" | "support") => {
      trackEvent({
        action: "form_submit",
        category: "Engagement",
        label: formType,
        custom_parameters: {
          form_type: formType,
        },
      });
    },
    [trackEvent]
  );

  const trackUserRegistration = useCallback(() => {
    trackEvent({
      action: "sign_up",
      category: "User",
      custom_parameters: {
        method: "email",
      },
    });
  }, [trackEvent]);

  const trackUserLogin = useCallback(() => {
    trackEvent({
      action: "login",
      category: "User",
      custom_parameters: {
        method: "email",
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackEcommerceEvent,
    trackCourseEnrollment,
    trackBlogView,
    trackContactForm,
    trackUserRegistration,
    trackUserLogin,
  };
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
