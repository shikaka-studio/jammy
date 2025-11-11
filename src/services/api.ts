import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/utils/auth';
import { API_URL } from '@/constants/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    // Add Authorization header if token exists
    // Skip for login/callback endpoints as they don't need auth
    if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/callback')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { status, data } = error.response ?? {};

    // 401 means token is invalid or expired - clear auth and redirect to login
    if (status === 401) {
      removeToken();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 403 means user doesn't have permission
    if (status === 403) {
      console.error('Permission denied:', data);
    }

    // 500+ are server errors
    if (status && status >= 500) {
      console.error('Server error:', data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
