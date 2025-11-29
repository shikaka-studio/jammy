import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SongSearch from '@/components/room/SongSearch';
import SongPlayer from '@/components/room/SongPlayer';
import SongQueue from '@/components/room/SongQueue';
import type { Song, QueueSong, SearchResult, PlayerState } from '@/types/room';

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

const Room = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTime: 140,
    isPlaying: true,
    volume: 0.8,
  });

  const [queue, setQueue] = useState<QueueSong[]>(MOCK_QUEUE);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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
            <SongQueue queue={queue} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Room;

