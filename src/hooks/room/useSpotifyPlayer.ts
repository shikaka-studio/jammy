import { useContext } from 'react';
import { SpotifyPlayerContext } from '@/contexts/SpotifyPlayerContext';
import type { SpotifyPlayerContextValue } from '@/types/spotifyPlayer';

/**
 * Hook to access Spotify Player from context
 * Must be used within SpotifyPlayerProvider
 */
export const useSpotifyPlayer = (): SpotifyPlayerContextValue => {
  const context = useContext(SpotifyPlayerContext);

  if (!context) {
    throw new Error('useSpotifyPlayer must be used within SpotifyPlayerProvider');
  }

  return context;
};
