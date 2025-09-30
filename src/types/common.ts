import { LucideIcon } from "lucide-react";

// User related types
export interface User {
  id: number;
  name: string;
  email?: string;
  mobile?: string;
  avatar?: string;
  email_verified_at: string | null;
  mobile_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

// Auth related types
export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}

// Navigation related types
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

// UI related types
export interface AppShellProps {
  children: React.ReactNode;
  variant?: "header" | "sidebar";
}

// Theme related types
export type Appearance = "light" | "dark" | "system";

// Language related types
export type Locale = "en" | "fa";

// API related types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Form related types
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Error related types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}
