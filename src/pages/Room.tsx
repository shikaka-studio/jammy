import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Layout from '@/components/layout/Layout';
import SongSearch from '@/components/room/SongSearch';
import SongPlayer from '@/components/room/SongPlayer';
import SongQueueTabs from '@/components/room/SongQueueTabs';
import type {
  Song,
  QueueSong,
  SearchResult,
  PlayerState,
  HistorySong,
  RoomSession,
  ChatMessage,
  Room as RoomType,
} from '@/types/room';
import { roomsService } from '@/services/rooms';
import { spotifyService } from '@/services/spotify';
import { useAuthStore } from '@/stores/auth';
import { ROUTES } from '@/constants/routes';

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

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
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

const Room = () => {
  const { id: roomCode } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [room, setRoom] = useState<RoomType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTime: 140,
    isPlaying: true,
    volume: 0.8,
  });

  const [queue, setQueue] = useState<QueueSong[]>(MOCK_QUEUE);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  useEffect(() => {
    const loadRoomDetails = async () => {
      if (!roomCode || !user) return;

      try {
        setIsLoading(true);
        setError(null);
        const roomData = await roomsService.getRoomDetails(roomCode);
        setRoom(roomData);

        // Check if user is already a member
        const isMember = roomData.members?.some(
          (member) => member.users?.spotify_id === user?.spotify_id
        );

        // If not a member, join automatically
        if (!isMember && user?.spotify_id) {
          try {
            setIsJoining(true);
            const updatedRoom = await roomsService.joinRoom(roomCode, user.spotify_id);
            setRoom(updatedRoom);
          } catch (joinErr) {
            setError(joinErr instanceof Error ? joinErr.message : 'Error joining the room');
            console.error('Error joining room:', joinErr);
          } finally {
            setIsJoining(false);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading room');
        console.error('Error loading room:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      setError('You must log in to access a room');
      setIsLoading(false);
      return;
    }

    if (roomCode) {
      loadRoomDetails();
    }
  }, [roomCode, user]);

  const handleLeaveRoom = async () => {
    if (!user?.spotify_id) {
      setError('You must log in to leave the room');
      return;
    }

    if (!roomCode) return;

    const confirmLeave = window.confirm('Are you sure you want to leave this room?');
    if (!confirmLeave) return;

    try {
      await roomsService.leaveRoom(roomCode, user.spotify_id);
      navigate(ROUTES.ROOMS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error leaving room');
      console.error('Error leaving room:', err);
    }
  };

  const handleCloseRoom = async () => {
    if (!user?.spotify_id) {
      setError('You must log in to close the room');
      return;
    }

    if (!roomCode || !room) return;

    // Check if user is the host by comparing with host_id or host.spotify_id
    const userIsHost = checkIsHost(room, user.id);

    if (!userIsHost) {
      setError('Only the host can close the room');
      return;
    }

    const confirmClose = window.confirm(
      'Are you sure you want to close this room? All members will be disconnected.'
    );
    if (!confirmClose) return;

    try {
      await roomsService.closeRoom(roomCode, user.spotify_id);
      navigate(ROUTES.ROOMS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error closing room');
      console.error('Error closing room:', err);
    }
  };

  // Check if current user is the room host
  const checkIsHost = (roomData: RoomType | null, userId?: string): boolean => {
    if (!roomData || !userId) return false;

    // First try with host_id (user UUID)
    if (roomData.host_id === userId) return true;

    // If host object exists, compare with spotify_id
    if (roomData.host?.spotify_id === user?.spotify_id) return true;

    return false;
  };

  const isHost = checkIsHost(room, user?.id);

  const handleTogglePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSeek = (time: number) => {
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleSearch = async (query: string) => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const results = await spotifyService.searchTracks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching songs');
      console.error('Error searching songs:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
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
      userName: 'You',
      message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className='flex h-[calc(100vh-56.5px)] items-center justify-center'>
          <div className='text-text-secondary'>Loading room...</div>
        </div>
      </Layout>
    );
  }

  if (error && !room) {
    return (
      <Layout>
        <div className='flex h-[calc(100vh-56.5px)] flex-col items-center justify-center gap-4'>
          <div className='text-red-500'>{error}</div>
          <button
            onClick={() => navigate(ROUTES.ROOMS)}
            className='bg-primary hover:bg-primary/90 rounded-xl px-6 py-2 text-gray-900 transition'
          >
            Back to rooms
          </button>
        </div>
      </Layout>
    );
  }

  if (isJoining) {
    return (
      <Layout>
        <div className='flex h-[calc(100vh-56.5px)] items-center justify-center'>
          <div className='text-text-secondary'>Joining the room...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='flex h-[calc(100vh-56.5px)] flex-col py-4'>
        {/* Room header with controls */}
        <div className='px-6 pb-4 md:px-12 xl:px-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-text-primary text-2xl font-bold'>{room?.name}</h1>
              <p className='text-text-secondary text-sm'>
                {room?.members?.length || 0} {room?.members?.length === 1 ? 'member' : 'members'}
                {isHost && <span className='text-primary ml-2'>(Host)</span>}
              </p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={handleLeaveRoom}
                className='border-border text-text-primary hover:bg-surface-hover rounded-xl border bg-transparent px-4 py-2 text-sm font-medium transition'
              >
                Leave
              </button>
              {isHost && (
                <button
                  onClick={handleCloseRoom}
                  className='rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600'
                >
                  Close room
                </button>
              )}
            </div>
          </div>
          {error && (
            <div className='mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500'>
              {error}
            </div>
          )}
        </div>

        <div className='flex h-full w-full flex-col gap-4 px-6 md:px-12 lg:flex-row xl:px-6'>
          {/* Left column: Search and Player */}
          <div className='flex flex-1 flex-col gap-4' style={{ flex: '3' }}>
            {/* Search bar at top */}
            <SongSearch
              searchResults={searchResults}
              onSearch={handleSearch}
              onAddSong={handleAddSong}
              isSearching={isSearching}
            />

            {/* Player at bottom */}
            <div className='flex flex-1'>
              <SongPlayer
                currentSong={MOCK_CURRENT_SONG}
                playerState={playerState}
                onTogglePlay={handleTogglePlay}
                onSeek={handleSeek}
              />
            </div>
          </div>

          {/* Right column: Song queue */}
          <div className='flex'>
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
