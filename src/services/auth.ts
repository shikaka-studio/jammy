import apiClient from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { AuthURLResponse, AuthCallbackResponse, AuthMeResponse } from '@/types/auth';

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

  async handleCallback(code: string): Promise<AuthCallbackResponse> {
    try {
      const response = await apiClient.get<AuthCallbackResponse>(API_ENDPOINTS.AUTH.CALLBACK, {
        params: { code },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to handle callback:', error);
      throw new Error('Failed to complete Spotify login');
    }
  },

  async getCurrentUser(): Promise<AuthMeResponse> {
    try {
      const response = await apiClient.get<AuthMeResponse>(API_ENDPOINTS.AUTH.ME);
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

  // TODO: Refresh token?
};
