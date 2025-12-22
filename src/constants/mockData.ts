import type { Song, QueueSong, HistorySong, RoomSession, ChatMessage } from '@/types/room';

export const MOCK_CURRENT_SONG: Song = {
  id: '1',
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  album: 'After Hours',
  album_art_url:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  duration_ms: 200000,
  spotify_id: 'mock-1',
  spotify_uri: 'spotify:track:mock-1',
};

export const MOCK_QUEUE: QueueSong[] = [
  {
    id: '2',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    album_art_url:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    duration_ms: 167000,
    spotify_id: 'mock-2',
    spotify_uri: 'spotify:track:mock-2',
    likes: 12,
    dislikes: 2,
    addedBy: 'user1',
  },
  {
    id: '3',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    album_art_url:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration_ms: 215000,
    spotify_id: 'mock-3',
    spotify_uri: 'spotify:track:mock-3',
    likes: 8,
    dislikes: 1,
    addedBy: 'user2',
  },
];

export const MOCK_RECENT_SONGS: HistorySong[] = [
  {
    id: '10',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    album_art_url:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration_ms: 230000,
    spotify_id: 'mock-10',
    spotify_uri: 'spotify:track:mock-10',
    playedAt: new Date(Date.now() - 1000 * 60 * 5),
    addedBy: 'user3',
  },
  {
    id: '11',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    album_art_url:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    duration_ms: 203000,
    spotify_id: 'mock-11',
    spotify_uri: 'spotify:track:mock-11',
    playedAt: new Date(Date.now() - 1000 * 60 * 10),
    addedBy: 'user1',
  },
];

export const MOCK_SESSIONS: RoomSession[] = [
  {
    id: 'session-1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    songs: [
      {
        id: '20',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: '÷ (Divide)',
        album_art_url:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration_ms: 234000,
        spotify_id: 'mock-20',
        spotify_uri: 'spotify:track:mock-20',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30),
        addedBy: 'user1',
      },
      {
        id: '21',
        title: 'Uptown Funk',
        artist: 'Bruno Mars',
        album: 'Uptown Special',
        album_art_url:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
        duration_ms: 270000,
        spotify_id: 'mock-21',
        spotify_uri: 'spotify:track:mock-21',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 25),
        addedBy: 'user2',
      },
      {
        id: '22',
        title: "Can't Stop the Feeling",
        artist: 'Justin Timberlake',
        album: 'Trolls (Original Motion Picture Soundtrack)',
        album_art_url:
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
        duration_ms: 237000,
        spotify_id: 'mock-22',
        spotify_uri: 'spotify:track:mock-22',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 20),
        addedBy: 'user3',
      },
    ],
  },
  {
    id: 'session-2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    songs: [
      {
        id: '30',
        title: 'Believer',
        artist: 'Imagine Dragons',
        album: 'Evolve',
        album_art_url:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration_ms: 204000,
        spotify_id: 'mock-30',
        spotify_uri: 'spotify:track:mock-30',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 15),
        addedBy: 'user1',
      },
      {
        id: '31',
        title: 'Thunder',
        artist: 'Imagine Dragons',
        album: 'Evolve',
        album_art_url:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration_ms: 187000,
        spotify_id: 'mock-31',
        spotify_uri: 'spotify:track:mock-31',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 10),
        addedBy: 'user2',
      },
    ],
  },
  {
    id: 'session-3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    songs: [
      {
        id: '40',
        title: 'Photograph',
        artist: 'Ed Sheeran',
        album: 'x (Multiply)',
        album_art_url:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration_ms: 258000,
        spotify_id: 'mock-40',
        spotify_uri: 'spotify:track:mock-40',
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 72 - 1000 * 60 * 10),
        addedBy: 'user4',
      },
    ],
  },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    userId: 'user1',
    userName: 'Carlos',
    message: 'What a great song! 🎵',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'msg-2',
    userId: 'user2',
    userName: 'Maria',
    message: 'Can someone play some rock?',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: 'msg-3',
    userId: 'user3',
    userName: 'Pablo',
    message: "I'll add one right now",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];
