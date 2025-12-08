export const SKIP_VOTES_REQUIRED = 5;

export const ROOM_TEXTS = {
  QUEUE_TITLE: 'Up next in the queue',
  SEARCH_PLACEHOLDER: 'Search for a song on Spotify...',
  ADD_BUTTON: 'Add',
  SKIP_LABEL: 'to skip',
  NO_RESULTS: 'No results found',
  NOW_PLAYING: 'Now Playing',
} as const;

export const QUEUE_TABS = {
  QUEUE: 'Queue',
  RECENT: 'Recent',
  CHAT: 'Chat',
} as const;

export const CHAT_TEXTS = {
  PLACEHOLDER: 'Write a message...',
  EMPTY_MESSAGE: 'No messages yet. Be the first to write!',
  SEND_BUTTON: 'Send',
} as const;

export const HISTORY_MODAL = {
  TITLE: 'Session History',
  SONGS_LABEL: 'songs',
  SONG_LABEL: 'song',
  EXPORT_BUTTON: 'Export to Spotify',
  EMPTY_MESSAGE: 'No previous sessions',
  PLAYED_AT: 'Played at',
} as const;

export const PLAYER_CONTROLS = {
  VOLUME_STEP: 0.1,
  SEEK_STEP: 5,
} as const;

export const BASE_ROOM_FILTERS = [
  { type: 'all', label: 'All' },
  { type: 'popular', label: 'Most popular' },
  { type: 'recent', label: 'Recently created' },
] as const;

export const ROOMS_PAGE_TEXTS = {
  TITLE: 'Explore the galaxy',
  SUBTITLE: 'Explore active music rooms or create your own.',
  CREATE_BUTTON: 'Create new room',
  USERS_LABEL: 'users',
} as const;

export const CREATE_ROOM_MODAL = {
  TITLE: 'Create new room',
  NAME_LABEL: 'Room name',
  NAME_PLACEHOLDER: 'E.g.: 90s Rock',
  TAGS_LABEL: 'Tags',
  TAGS_PLACEHOLDER: 'Enter tags separated by commas (e.g., rock, 90s, grunge)',
  DESCRIPTION_LABEL: 'Description',
  DESCRIPTION_PLACEHOLDER: 'Describe the vibe of your room...',
  COVER_LABEL: 'Cover image',
  COVER_HINT: 'Drag an image or click to select',
  COVER_CHANGE: 'Change image',
  SUBMIT_BUTTON: 'Create room',
  CANCEL_BUTTON: 'Cancel',
} as const;
