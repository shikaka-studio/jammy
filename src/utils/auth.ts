import { STORAGE_KEYS } from '@/constants/common';

export const getToken = (): string | null => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

export const getSpotifyToken = (): string | null =>
  localStorage.getItem(STORAGE_KEYS.SPOTIFY_TOKEN);

export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const setSpotifyToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.SPOTIFY_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const isAuthenticated = (): boolean => !!getToken();

export const getUserData = (): unknown => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

export const setUserData = (user: unknown): void => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
};

export const removeUserData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

export const clearAuth = (): void => {
  removeToken();
  removeUserData();
};
