// App constants
export const APP_NAME = "Menteeno";
export const APP_DESCRIPTION =
  "A place to grow your skills in both personal and professional life";

// API constants
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const API_TIMEOUT = 10000; // 10 seconds

// Local storage keys
export const STORAGE_KEYS = {
  AUTH: "auth",
  THEME: "appearance",
  LANGUAGE: "language",
  SIDEBAR_STATE: "sidebar_state",
} as const;

// Cookie names
export const COOKIE_NAMES = {
  AUTH_TOKEN: "auth_token",
  THEME: "appearance",
  LANGUAGE: "language",
} as const;

// Theme constants
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

// Language constants
export const LANGUAGES = {
  EN: "en",
  FA: "fa",
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  EMAIL_MAX_LENGTH: 255,
} as const;
