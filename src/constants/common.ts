// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'jammy_token',
  SPOTIFY_TOKEN: 'jammy_spotify_token',
  USER_DATA: 'jammy_user',
  THEME: 'jammy_theme',
} as const;

// Spotify Product Types
export const SPOTIFY_PRODUCT_TYPES = {
  PREMIUM: 'premium',
  FREE: 'free',
} as const;

// Premium Warning Messages
export const PREMIUM_WARNING = {
  TITLE: 'Spotify Premium Required for Playback',
  MESSAGE:
    "You can still add songs, vote, and chat, but you won't be able to listen to the music without a Spotify Premium account.",
} as const;
