import { useState, useCallback } from 'react';
import { spotifyService } from '@/services/spotify';
import { songsService } from '@/services/songs';
import type { SearchResult } from '@/types/room';

interface UseSongSearchOptions {
  roomCode: string | undefined;
  userSpotifyId: string | undefined;
}

interface UseSongSearchReturn {
  searchResults: SearchResult[];
  isSearching: boolean;
  handleSearch: (query: string) => Promise<void>;
  handleAddSong: (song: SearchResult) => Promise<void>;
}

const useSongSearch = ({ roomCode, userSpotifyId }: UseSongSearchOptions): UseSongSearchReturn => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await spotifyService.searchTracks(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Error searching songs:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleAddSong = useCallback(
    async (song: SearchResult) => {
      if (!roomCode || !userSpotifyId) {
        console.error('Cannot add song: missing room or user information');
        return;
      }

      const { spotify_id, title, artist, album, album_art_url, duration_ms, spotify_uri } = song;

      try {
        await songsService.addSongToQueue({
          code: roomCode,
          spotify_track_id: spotify_id,
          title,
          artist,
          album,
          album_art_url,
          spotify_uri,
          duration_ms,
          user_spotify_id: userSpotifyId,
        });
        // Queue will be updated via WebSocket
      } catch (err) {
        console.error('Error adding song:', err);
      }
    },
    [roomCode, userSpotifyId]
  );

  return {
    searchResults,
    isSearching,
    handleSearch,
    handleAddSong,
  };
};

export default useSongSearch;
