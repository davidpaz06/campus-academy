// API constants
export const API_BASE_URL = "https://campus-api-gateway.onrender.com/api";
// export const API_BASE_URL = "http://localhost:3000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile", // ✅ Cambiar a /auth/profile si /users/me no existe
  },
  // Agregar otros endpoints según necesites
} as const;

// Storage constants
export const STORAGE_KEYS = {
  TOKEN: "campus_auth_token",
  REFRESH_TOKEN: "campus_refresh_token",
  USER: "campus_user",
} as const;
