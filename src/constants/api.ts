export const API_URL = import.meta.env.VITE_API_URL;
export const WS_URL = import.meta.env.VITE_WS_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;

const API_V1 = '/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: `${API_V1}/auth/me`,
    LOGOUT: `${API_V1}/auth/logout`,
    REFRESH: `${API_V1}/auth/refresh`,
  },
  ROOMS: {
    LIST: `${API_V1}/rooms`,
    CREATE: `${API_V1}/rooms/create`,
    JOIN: `${API_V1}/rooms/join`,
    DETAILS: (roomCode: string) => `${API_V1}/rooms/${roomCode}`,
    LEAVE: (roomCode: string) => `${API_V1}/rooms/${roomCode}/leave`,
    CLOSE: (roomCode: string) => `${API_V1}/rooms/${roomCode}`,
    UPLOAD_COVER: `${API_V1}/rooms/upload/cover`,
  },
  PLAYBACK: {
    STATE: (roomCode: string) => `${API_V1}/playback/room/${roomCode}/state`,
  },
  SONGS: {
    ADD: `${API_V1}/songs/add`,
  },
} as const;
