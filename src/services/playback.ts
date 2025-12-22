import apiClient from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { PlaybackState } from '@/types/websocket';

export const playbackService = {
  async getPlaybackState(roomCode: string): Promise<PlaybackState> {
    try {
      const response = await apiClient.get<PlaybackState>(API_ENDPOINTS.PLAYBACK.STATE(roomCode));
      return response.data;
    } catch (error) {
      console.error('Failed to get playback state:', error);
      throw new Error('Could not load playback state');
    }
  },
};
