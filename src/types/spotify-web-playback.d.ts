// Spotify Web Playback SDK TypeScript definitions
// https://developer.spotify.com/documentation/web-playback-sdk/reference

declare namespace Spotify {
  interface Album {
    uri: string;
    name: string;
    images: Image[];
  }

  interface Artist {
    uri: string;
    name: string;
  }

  interface Error {
    message: string;
  }

  interface Image {
    url: string;
    height: number | null;
    width: number | null;
  }

  interface PlaybackContext {
    uri: string | null;
    metadata: Record<string, unknown>;
  }

  interface PlaybackDisallows {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  }

  interface PlaybackRestrictions {
    disallow_pausing_reasons: string[];
    disallow_peeking_next_reasons: string[];
    disallow_peeking_prev_reasons: string[];
    disallow_resuming_reasons: string[];
    disallow_seeking_reasons: string[];
    disallow_skipping_next_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  }

  interface PlaybackState {
    context: PlaybackContext;
    disallows: PlaybackDisallows;
    paused: boolean;
    position: number;
    repeat_mode: 0 | 1 | 2;
    shuffle: boolean;
    restrictions: PlaybackRestrictions;
    duration: number;
    track_window: PlaybackTrackWindow;
    timestamp: number;
  }

  interface PlaybackTrackWindow {
    current_track: Track;
    previous_tracks: Track[];
    next_tracks: Track[];
  }

  interface PlayerInit {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
    volume?: number;
  }

  interface Track {
    uri: string;
    id: string | null;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    album: Album;
    artists: Artist[];
    duration_ms: number;
  }

  interface WebPlaybackError {
    message: string;
  }

  interface WebPlaybackPlayer {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(
      event: 'ready',
      callback: (data: { device_id: string }) => void
    ): void;
    addListener(
      event: 'not_ready',
      callback: (data: { device_id: string }) => void
    ): void;
    addListener(
      event: 'player_state_changed',
      callback: (state: PlaybackState | null) => void
    ): void;
    addListener(
      event: 'initialization_error' | 'authentication_error' | 'account_error' | 'playback_error',
      callback: (error: WebPlaybackError) => void
    ): void;
    removeListener(
      event: string,
      callback?: (...args: unknown[]) => void
    ): void;
    getCurrentState(): Promise<PlaybackState | null>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;
    seek(positionMs: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    activateElement(): Promise<void>;
  }

  class Player implements WebPlaybackPlayer {
    constructor(options: PlayerInit);
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(
      event: 'ready',
      callback: (data: { device_id: string }) => void
    ): void;
    addListener(
      event: 'not_ready',
      callback: (data: { device_id: string }) => void
    ): void;
    addListener(
      event: 'player_state_changed',
      callback: (state: PlaybackState | null) => void
    ): void;
    addListener(
      event: 'initialization_error' | 'authentication_error' | 'account_error' | 'playback_error',
      callback: (error: WebPlaybackError) => void
    ): void;
    removeListener(
      event: string,
      callback?: (...args: unknown[]) => void
    ): void;
    getCurrentState(): Promise<PlaybackState | null>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;
    seek(positionMs: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    activateElement(): Promise<void>;
  }
}
