import messages from "@/i18n.json";
import Lang from "lang.js";

// Check if we're in a browser environment before accessing localStorage
const getLocale = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locale") || "en";
  }
  return "en";
};

export const lang = new Lang({
  messages,
  locale: getLocale(),
});
