import { SPOTIFY_SDK_URL } from '@/constants/spotify';

let sdkLoadPromise: Promise<void> | null = null;

/**
 * Load the Spotify Web Playback SDK script
 * Returns a promise that resolves when SDK is ready
 * Subsequent calls return the same promise
 */
export const loadSpotifySDK = (): Promise<void> => {
  // Return existing promise if SDK is already loading or loaded
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  // Check if SDK is already loaded
  if (window.Spotify) {
    return Promise.resolve();
  }

  // Check if script tag already exists
  const existingScript = document.querySelector(`script[src="${SPOTIFY_SDK_URL}"]`);
  if (existingScript) {
    sdkLoadPromise = new Promise((resolve) => {
      window.onSpotifyWebPlaybackSDKReady = () => resolve();
    });
    return sdkLoadPromise;
  }

  // Create new load promise
  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SPOTIFY_SDK_URL;
    script.async = true;

    script.onerror = () => {
      sdkLoadPromise = null; // Reset on error to allow retry
      reject(new Error('Failed to load Spotify Web Playback SDK'));
    };

    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };

    document.body.appendChild(script);
  });

  return sdkLoadPromise;
};

export const isSpotifySDKLoaded = (): boolean => !!window.Spotify;
