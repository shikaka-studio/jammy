export const API_URL = import.meta.env.VITE_API_URL;
export const WS_URL = import.meta.env.VITE_WS_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    CALLBACK: '/callback',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
} as const;
