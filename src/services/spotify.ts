import { getSpotifyToken, setSpotifyToken as saveSpotifyToken } from '@/utils/auth';
import type { SearchResult } from '@/types/room';
import { authService } from './auth';
import { useAuthStore } from '@/stores/auth';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

/**
 * Makes a Spotify API request with automatic token refresh on 401
 */
const fetchWithTokenRefresh = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let token = getSpotifyToken();

  // Make initial request
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // If token expired, refresh and retry once
  if (response.status === 401) {
    try {
      const newToken = await authService.refreshSpotifyToken();
      saveSpotifyToken(newToken);
      useAuthStore.getState().setSpotifyToken(newToken);

      // Retry request with new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } catch (refreshError) {
      console.error('Failed to refresh Spotify token:', refreshError);
      throw new Error('Spotify token expired. Please log in again');
    }
  }

  return response;
};

export const spotifyService = {
  async searchTracks(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    try {
      const url = `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
      const response = await fetchWithTokenRefresh(url);

      if (!response.ok) {
        throw new Error('Error searching songs on Spotify');
      }

      const data: SpotifySearchResponse = await response.json();

      return data.tracks.items.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        album_art_url: track.album.images[0]?.url || '',
        duration_ms: track.duration_ms,
        spotify_id: track.id,
        spotify_uri: `spotify:track:${track.id}`,
      }));
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
    }
  },

  async play(deviceId: string, spotifyUri?: string, positionMs: number = 0): Promise<void> {
    const body: Record<string, unknown> = {
      position_ms: positionMs,
    };

    if (spotifyUri) {
      body.uris = [spotifyUri];
    }

    const response = await fetchWithTokenRefresh(
      `${SPOTIFY_API_BASE}/me/player/play?device_id=${deviceId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to play: ${response.statusText}`);
    }
  },

  async pause(deviceId: string): Promise<void> {
    const response = await fetchWithTokenRefresh(
      `${SPOTIFY_API_BASE}/me/player/pause?device_id=${deviceId}`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to pause: ${response.statusText}`);
    }
  },

  async seek(deviceId: string, positionMs: number): Promise<void> {
    const response = await fetchWithTokenRefresh(
      `${SPOTIFY_API_BASE}/me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to seek: ${response.statusText}`);
    }
  },
};
