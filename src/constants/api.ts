export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },
  COURSES: {
    LIST: "/courses",
    CREATE: "/courses",
    DETAIL: (id: string) => `/courses/${id}`,
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
  },
  MODULES: {
    CREATE: "/modules",
    UPDATE: (id: string) => `/modules/${id}`,
    DELETE: (id: string) => `/modules/${id}`,
  },
  LESSONS: {
    CREATE: "/lessons",
    UPDATE: (id: string) => `/lessons/${id}`,
    DELETE: (id: string) => `/lessons/${id}`,
  },
  UPLOADS: {
    IMAGE: "/uploads/image",
    VIDEO: "/uploads/video",
  },
} as const;
