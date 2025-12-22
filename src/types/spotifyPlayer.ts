export interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  togglePlay: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  getCurrentState: () => Promise<Spotify.PlaybackState | null>;
  addListener(event: 'ready' | 'not_ready', callback: (data: { device_id: string }) => void): void;
  addListener(
    event: 'player_state_changed',
    callback: (state: Spotify.PlaybackState | null) => void
  ): void;
  addListener(
    event: 'initialization_error' | 'authentication_error' | 'account_error' | 'playback_error',
    callback: (error: { message: string }) => void
  ): void;
  removeListener: (event: string, callback?: (...args: unknown[]) => void) => void;
  _options: {
    getOAuthToken: (callback: (token: string) => void) => void;
  };
}

export interface UseSpotifyPlayerOptions {
  onPlayerReady?: (deviceId: string) => void;
  onPlayerStateChange?: (state: Spotify.PlaybackState | null) => void;
  onPlayerError?: (error: Error) => void;
}

export interface UseSpotifyPlayerReturn {
  isReady: boolean;
  deviceId: string | null;
  isPaused: boolean;
  play: (spotifyUri?: string, positionMs?: number) => Promise<void>;
  pause: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

export interface SpotifyPlayerContextValue extends UseSpotifyPlayerReturn {
  // Context can be extended with additional values if needed
}
