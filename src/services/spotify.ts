import { getSpotifyToken } from '@/utils/auth';
import type { SearchResult } from '@/types/room';

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

export const spotifyService = {
  async searchTracks(query: string): Promise<SearchResult[]> {
    const token = getSpotifyToken();

    if (!token) {
      throw new Error('No Spotify token available');
    }

    if (!query || query.trim().length === 0) {
      return [];
    }

    try {
      const response = await fetch(
        `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Spotify token expired. Please log in again');
        }
        throw new Error('Error searching songs on Spotify');
      }

      const data: SpotifySearchResponse = await response.json();

      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        albumCover: track.album.images[0]?.url || '',
        duration: Math.floor(track.duration_ms / 1000),
      }));
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
    }
  },
};

