export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "Campus Academy",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
} as const;

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;
