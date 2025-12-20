import apiClient from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { AddSongRequest } from '@/types/room';

export const songsService = {
  async addSongToQueue(request: AddSongRequest): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.SONGS.ADD, request);
    } catch (error) {
      console.error('Failed to add song to queue:', error);
      throw new Error('Failed to add song to queue');
    }
  },
};
