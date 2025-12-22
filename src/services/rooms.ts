import apiClient from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  Room,
  CreateRoomRequest,
  JoinRoomRequest,
  LeaveRoomParams,
  CloseRoomParams,
  CreateRoomFormData,
  UploadImageResponse,
} from '@/types/room';

export const roomsService = {
  async getRooms(): Promise<Room[]> {
    try {
      const response = await apiClient.get<Room[]>(API_ENDPOINTS.ROOMS.LIST);
      return response.data;
    } catch (error) {
      console.error('Failed to get rooms:', error);
      throw new Error('Could not load rooms');
    }
  },

  async uploadCoverImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post<UploadImageResponse>(
        API_ENDPOINTS.ROOMS.UPLOAD_COVER,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.url;
    } catch (error: any) {
      console.error('Failed to upload cover image:', error);

      // Extract error message from API response
      const errorMessage = error?.response?.data?.detail || 'Could not upload cover image';
      throw new Error(errorMessage);
    }
  },

  async createRoom(formData: CreateRoomFormData, hostSpotifyId: string): Promise<Room> {
    try {
      const payload: CreateRoomRequest = {
        name: formData.name,
        host_spotify_id: hostSpotifyId,
        description: formData.description,
        cover_image_url: formData.coverImageUrl,
        tags: formData.tags,
      };

      const response = await apiClient.post<Room>(API_ENDPOINTS.ROOMS.CREATE, payload);
      return response.data;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw new Error('Could not create room');
    }
  },

  async joinRoom(code: string, userSpotifyId: string): Promise<Room> {
    try {
      const payload: JoinRoomRequest = {
        code,
        user_spotify_id: userSpotifyId,
      };
      const response = await apiClient.post<Room>(API_ENDPOINTS.ROOMS.JOIN, payload);
      return response.data;
    } catch (error) {
      console.error('Failed to join room:', error);
      throw new Error('Could not join room');
    }
  },

  async getRoomDetails(roomCode: string): Promise<Room> {
    try {
      const response = await apiClient.get<Room>(API_ENDPOINTS.ROOMS.DETAILS(roomCode));
      return response.data;
    } catch (error) {
      console.error('Failed to get room details:', error);
      throw new Error('Could not load room details');
    }
  },

  async leaveRoom(roomCode: string, userSpotifyId: string): Promise<void> {
    try {
      const params: LeaveRoomParams = {
        user_spotify_id: userSpotifyId,
      };
      await apiClient.post(API_ENDPOINTS.ROOMS.LEAVE(roomCode), null, { params });
    } catch (error) {
      console.error('Failed to leave room:', error);
      throw new Error('Could not leave room');
    }
  },

  async closeRoom(roomCode: string, hostSpotifyId: string): Promise<void> {
    try {
      const params: CloseRoomParams = {
        host_spotify_id: hostSpotifyId,
      };
      await apiClient.delete(API_ENDPOINTS.ROOMS.CLOSE(roomCode), { params });
    } catch (error) {
      console.error('Failed to close room:', error);
      throw new Error('Could not close room');
    }
  },
};
