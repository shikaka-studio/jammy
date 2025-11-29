import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SongSearch from '@/components/room/SongSearch';
import SongPlayer from '@/components/room/SongPlayer';
import SongQueueTabs from '@/components/room/SongQueueTabs';
import type { Song, QueueSong, SearchResult, PlayerState, HistorySong, RoomSession, ChatMessage } from '@/types/room';

// Mock data for development
const MOCK_CURRENT_SONG: Song = {
  id: '1',
  name: 'Blinding Lights',
  artist: 'The Weeknd',
  albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  duration: 200,
};

const MOCK_QUEUE: QueueSong[] = [
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

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '4',
    name: 'Flowers',
    artist: 'Miley Cyrus',
    albumCover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    duration: 200,
    album: 'Endless Summer Vacation',
  },
  {
    id: '5',
    name: 'Anti-Hero',
    artist: 'Taylor Swift',
    albumCover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    duration: 200,
    album: 'Midnights',
  },
];

const MOCK_RECENT_SONGS: HistorySong[] = [
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

const MOCK_SESSIONS: RoomSession[] = [
  {
    id: 'session-1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    songs: [
      {
        id: '20',
        name: 'Shape of You',
        artist: 'Ed Sheeran',
        albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 234,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30),
        addedBy: 'user1',
      },
      {
        id: '21',
        name: 'Uptown Funk',
        artist: 'Bruno Mars',
        albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
        duration: 270,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 25),
        addedBy: 'user2',
      },
      {
        id: '22',
        name: "Can't Stop the Feeling",
        artist: 'Justin Timberlake',
        albumCover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
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
        albumCover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration: 204,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 - 1000 * 60 * 15),
        addedBy: 'user1',
      },
      {
        id: '31',
        name: 'Thunder',
        artist: 'Imagine Dragons',
        albumCover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
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
        albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 258,
        playedAt: new Date(Date.now() - 1000 * 60 * 60 * 72 - 1000 * 60 * 10),
        addedBy: 'user4',
      },
    ],
  },
];

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    userId: 'user1',
    userName: 'Carlos',
    message: '¡Qué buena canción! 🎵',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'msg-2',
    userId: 'user2',
    userName: 'María',
    message: 'Alguien puede poner algo de rock?',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: 'msg-3',
    userId: 'user3',
    userName: 'Pablo',
    message: 'Yo añado una ahora mismo',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

const Room = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTime: 140,
    isPlaying: true,
    volume: 0.8,
  });

  const [queue, setQueue] = useState<QueueSong[]>(MOCK_QUEUE);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  const handleTogglePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSeek = (time: number) => {
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleSearch = (query: string) => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }
    // Simulate search by filtering mock results
    const filtered = MOCK_SEARCH_RESULTS.filter(
      (song) =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.length > 0 ? filtered : MOCK_SEARCH_RESULTS);
  };

  const handleAddSong = (song: SearchResult) => {
    const newQueueSong: QueueSong = {
      ...song,
      likes: 0,
      dislikes: 0,
      addedBy: 'currentUser',
    };
    setQueue((prev) => [...prev, newQueueSong]);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: 'currentUser',
      userName: 'Tú',
      message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-56.5px)] flex-col py-4">
        <div className="flex h-full w-full flex-col gap-4 px-6 md:px-12 xl:px-6 lg:flex-row">
          {/* Left column: Search and Player */}
          <div className="flex flex-1 flex-col gap-4 lg:flex-[3]">
            {/* Search bar at top */}
            <SongSearch
              searchResults={searchResults}
              onSearch={handleSearch}
              onAddSong={handleAddSong}
            />

            {/* Player at bottom */}
            <div className="flex flex-1">
              <SongPlayer
                currentSong={MOCK_CURRENT_SONG}
                playerState={playerState}
                onTogglePlay={handleTogglePlay}
                onSeek={handleSeek}
              />
            </div>
          </div>

          {/* Right column: Song queue */}
          <div className="flex">
            <SongQueueTabs
              queue={queue}
              recentSongs={MOCK_RECENT_SONGS}
              sessions={MOCK_SESSIONS}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Room;

