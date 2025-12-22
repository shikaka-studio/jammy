// Global type augmentations and ambient declarations

declare global {
  interface Window {
    Spotify: typeof Spotify;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

// This export makes TypeScript treat this as a module
export {};
