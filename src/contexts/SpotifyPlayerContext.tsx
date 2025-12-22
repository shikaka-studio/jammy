import { createContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/auth';
import { spotifyService } from '@/services/spotify';
import { loadSpotifySDK } from '@/utils/spotifySdk';
import { PLAYER_NAME } from '@/constants/spotify';
import type { SpotifyPlayer, SpotifyPlayerContextValue } from '@/types/spotifyPlayer';

export const SpotifyPlayerContext = createContext<SpotifyPlayerContextValue | null>(null);

interface SpotifyPlayerProviderProps {
  children: ReactNode;
  onPlayerReady?: (deviceId: string) => void;
  onPlayerStateChange?: (state: Spotify.PlaybackState | null) => void;
}

export const SpotifyPlayerProvider = ({
  children,
  onPlayerReady,
  onPlayerStateChange,
}: SpotifyPlayerProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const { spotifyToken, setSpotifyToken } = useAuthStore();

  // Get OAuth token
  // Note: Uses getState() instead of spotifyToken from hook to avoid stale closure
  // The Spotify SDK stores this callback and may call it much later
  const getOAuthToken = useCallback((callback: (token: string) => void) => {
    // Get current token from store (not stale closure value)
    const currentToken = useAuthStore.getState().spotifyToken;

    if (currentToken) {
      callback(currentToken);
      return;
    }

    // If no token exists, something went wrong
    console.error('No Spotify token available');
  }, []);

  // Initialize player
  useEffect(() => {
    let isMounted = true;

    const initPlayer = async () => {
      try {
        // Load SDK
        await loadSpotifySDK();

        if (!isMounted || !window.Spotify) return;

        // Create player instance
        const player = new window.Spotify.Player({
          name: PLAYER_NAME,
          getOAuthToken: getOAuthToken,
          volume: 1.0,
        }) as unknown as SpotifyPlayer;

        // Error handlers
        player.addListener('initialization_error', ({ message }) => {
          console.error('Initialization error:', message);
        });

        player.addListener('authentication_error', async ({ message }) => {
          console.error('Authentication error:', message);

          try {
            // Refresh the token
            const newToken = await authService.refreshSpotifyToken();
            console.log('Token refreshed successfully, reconnecting player...');
            setSpotifyToken(newToken);

            // Disconnect and reconnect with new token
            if (!playerRef.current) {
              throw new Error('Player not available');
            }

            playerRef.current.disconnect();
            const success = await playerRef.current.connect();

            if (!success) {
              throw new Error('Failed to reconnect player');
            }

            console.log('Player reconnected successfully with new token');
          } catch (err) {
            console.error('Failed to recover from authentication error:', err);
          }
        });

        player.addListener('account_error', ({ message }) => {
          console.error('Account error:', message);
        });

        player.addListener('playback_error', ({ message }) => {
          console.error('Playback error:', message);
        });

        // Ready handler
        player.addListener('ready', ({ device_id }) => {
          if (!isMounted) return;
          console.log('Spotify player ready with device ID:', device_id);
          setDeviceId(device_id);
          setIsReady(true);
          onPlayerReady?.(device_id);
        });

        // Not ready handler
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device has gone offline:', device_id);
          setIsReady(false);
        });

        // Player state change handler
        player.addListener('player_state_changed', (state) => {
          if (!state || !isMounted) return;
          setIsPaused(state.paused);
          onPlayerStateChange?.(state);
        });

        // Connect player
        const success = await player.connect();

        if (!success) {
          console.error('Failed to connect Spotify player');
          return;
        }

        console.log('Spotify player connected successfully');
        playerRef.current = player;
      } catch (err) {
        console.error('Error initializing Spotify player:', err);
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
    };
  }, [spotifyToken, getOAuthToken, onPlayerReady, onPlayerStateChange]);

  // Play a track
  const play = useCallback(
    async (spotifyUri?: string, positionMs: number = 0) => {
      if (!deviceId) {
        console.error('Player not ready');
        return;
      }

      try {
        await spotifyService.play(deviceId, spotifyUri, positionMs);
      } catch (err) {
        console.error('Error playing track:', err);
      }
    },
    [deviceId]
  );

  // Pause playback
  const pause = useCallback(async () => {
    if (!deviceId) return;

    try {
      await spotifyService.pause(deviceId);
    } catch (err) {
      console.error('Error pausing playback:', err);
    }
  }, [deviceId]);

  // Seek to position
  const seek = useCallback(
    async (positionMs: number) => {
      if (!deviceId) return;

      try {
        await spotifyService.seek(deviceId, positionMs);
      } catch (err) {
        console.error('Error seeking:', err);
      }
    },
    [deviceId]
  );

  // Set volume
  const setVolumeControl = useCallback(async (volume: number) => {
    if (!playerRef.current) return;

    try {
      await playerRef.current.setVolume(volume);
    } catch (err) {
      console.error('Error setting volume:', err);
    }
  }, []);

  const value: SpotifyPlayerContextValue = {
    isReady,
    deviceId,
    isPaused,
    play,
    pause,
    seek,
    setVolume: setVolumeControl,
  };

  return <SpotifyPlayerContext.Provider value={value}>{children}</SpotifyPlayerContext.Provider>;
};
