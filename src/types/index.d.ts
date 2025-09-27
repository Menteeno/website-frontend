import type { Config } from "ziggy-js";
import type { Auth } from "./common";

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

// Re-export common types for backward compatibility
export type { Auth, BreadcrumbItem, NavGroup, NavItem, User } from "./common";
