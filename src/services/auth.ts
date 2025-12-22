import apiClient from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { AuthURLResponse } from '@/types/auth';
import { User } from '@/types/user';

export const authService = {
  async getAuthURL(): Promise<string> {
    try {
      const response = await apiClient.get<AuthURLResponse>(API_ENDPOINTS.AUTH.LOGIN);
      return response.data.auth_url;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
      throw new Error('Failed to initialize Spotify login');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw new Error('Failed to get user information');
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Even if server logout fails, we still clear local auth
      console.error('Failed to logout on server:', error);
    }
  },

  async refreshSpotifyToken(): Promise<string> {
    try {
      const response = await apiClient.post<{ message: string; access_token: string }>(
        API_ENDPOINTS.AUTH.REFRESH
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to refresh Spotify token:', error);
      throw new Error('Failed to refresh Spotify token');
    }
  },
};
