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
  onPlayerError?: (error: Error) => void;
}

export const SpotifyPlayerProvider = ({
  children,
  onPlayerReady,
  onPlayerStateChange,
  onPlayerError,
}: SpotifyPlayerProviderProps) => {
  const { spotifyToken, setSpotifyToken } = useAuthStore();

  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const playerRef = useRef<SpotifyPlayer | null>(null);

  // Get OAuth token with automatic refresh
  // Note: Uses getState() instead of spotifyToken from hook to avoid stale closure
  // The Spotify SDK stores this callback and may call it much later
  const getOAuthToken = useCallback(
    (callback: (token: string) => void) => {
      // Always get fresh token from store, not stale closure value
      const currentToken = useAuthStore.getState().spotifyToken;

      if (currentToken) {
        callback(currentToken);
        return;
      }

      // If no token, try to refresh
      authService
        .refreshSpotifyToken()
        .then((newToken) => {
          setSpotifyToken(newToken);
          callback(newToken);
        })
        .catch((err) => {
          console.error('Failed to refresh Spotify token:', err);
          setError('Failed to authenticate with Spotify');
          onPlayerError?.(new Error('Token refresh failed'));
        });
    },
    [setSpotifyToken, onPlayerError]
  );

  // Initialize player
  useEffect(() => {
    if (!spotifyToken) return;

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
          setError(`Initialization error: ${message}`);
          onPlayerError?.(new Error(message));
        });

        player.addListener('authentication_error', ({ message }) => {
          console.error('Authentication error:', message);
          setError(`Authentication error: ${message}`);
          onPlayerError?.(new Error(message));
        });

        player.addListener('account_error', ({ message }) => {
          console.error('Account error:', message);
          setError(`Account error: ${message}. Spotify Premium required.`);
          onPlayerError?.(new Error(message));
        });

        player.addListener('playback_error', ({ message }) => {
          console.error('Playback error:', message);
          setError(`Playback error: ${message}`);
          onPlayerError?.(new Error(message));
        });

        // Ready handler
        player.addListener('ready', ({ device_id }) => {
          if (!isMounted) return;
          console.log('Spotify player ready with device ID:', device_id);
          setDeviceId(device_id);
          setIsReady(true);
          setError(null);
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
          setError('Failed to connect to Spotify');
          return;
        }

        console.log('Spotify player connected successfully');
        playerRef.current = player;
      } catch (err) {
        console.error('Error initializing Spotify player:', err);
        setError('Failed to initialize Spotify player');
        onPlayerError?.(err instanceof Error ? err : new Error('Unknown error'));
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
  }, [spotifyToken, getOAuthToken, onPlayerReady, onPlayerStateChange, onPlayerError]);

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
        setError('Failed to play track');
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
      setError('Failed to pause playback');
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
        setError('Failed to seek');
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
      setError('Failed to set volume');
    }
  }, []);

  const value: SpotifyPlayerContextValue = {
    isReady,
    deviceId,
    isPaused,
    error,
    play,
    pause,
    seek,
    setVolume: setVolumeControl,
  };

  return <SpotifyPlayerContext.Provider value={value}>{children}</SpotifyPlayerContext.Provider>;
};
