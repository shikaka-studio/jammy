import type { Song, QueueSong, HistorySong, RoomSession, ChatMessage } from '@/types/room';

export const MOCK_CURRENT_SONG: Song = {
  id: '1',
  name: 'Blinding Lights',
  artist: 'The Weeknd',
  albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  duration: 200,
};

export const MOCK_QUEUE: QueueSong[] = [
  {
    id: '2',
    name: 'As It Was',
    artist: 'Harry Styles',
    albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    duration: 167,
    likes: 12,
    dislikes: 2,
    addedBy: 'user1',
  },
  {
    id: '3',
    name: 'Save Your Tears',
    artist: 'The Weeknd',
    albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 215,
    likes: 8,
    dislikes: 1,
    addedBy: 'user2',
  },
];

export const MOCK_RECENT_SONGS: HistorySong[] = [
  {
    id: '10',
    name: 'Starboy',
    artist: 'The Weeknd',
    albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 230,
    playedAt: new Date(Date.now() - 1000 * 60 * 5),
    addedBy: 'user3',
  },
  {
    id: '11',
    name: 'Levitating',
    artist: 'Dua Lipa',
    albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    duration: 203,
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
        name: 'Shape of You',
        artist: 'Ed Sheeran',
        albumCover:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 234,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30),
        addedBy: 'user1',
      },
      {
        id: '21',
        name: 'Uptown Funk',
        artist: 'Bruno Mars',
        albumCover:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
        duration: 270,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 25),
        addedBy: 'user2',
      },
      {
        id: '22',
        name: "Can't Stop the Feeling",
        artist: 'Justin Timberlake',
        albumCover:
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
        duration: 237,
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
        name: 'Believer',
        artist: 'Imagine Dragons',
        albumCover:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration: 204,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 15),
        addedBy: 'user1',
      },
      {
        id: '31',
        name: 'Thunder',
        artist: 'Imagine Dragons',
        albumCover:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration: 187,
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
        name: 'Photograph',
        artist: 'Ed Sheeran',
        albumCover:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 258,
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
