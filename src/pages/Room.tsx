import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import BaseLayout from '@/components/layout/BaseLayout';
import SongSearch from '@/components/room/SongSearch';
import SongPlayer from '@/components/room/SongPlayer';
import SongQueueTabs from '@/components/room/SongQueueTabs';
import type {
  QueueSong,
  SearchResult,
  PlayerState,
  ChatMessage,
  Room as RoomType,
  Song,
  HistorySong,
} from '@/types/room';
import type { PlaybackState, QueueSongWS, Notification } from '@/types/websocket';
import { roomsService } from '@/services/rooms';
import { playbackService } from '@/services/playback';
import { spotifyService } from '@/services/spotify';
import { songsService } from '@/services/songs';
import { useAuthStore } from '@/stores/auth';
import { useRoomWebSocket } from '@/hooks/useRoomWebSocket';
import { ROUTES } from '@/constants/routes';
import { MOCK_SESSIONS, MOCK_CHAT_MESSAGES } from '@/constants/mockData';
import { checkIsHost } from '@/utils/room';
import { convertTrackToSong, calculateCurrentPosition } from '@/utils/playback';

const Room = () => {
  const { id: roomCode } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [room, setRoom] = useState<RoomType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTime: 0,
    isPlaying: false,
    volume: 0.8,
  });
  const [playbackStartedAt, setPlaybackStartedAt] = useState<string | null>(null);
  const [basePositionMs, setBasePositionMs] = useState(0);
  const [queue, setQueue] = useState<QueueSong[]>([]);
  const [recentSongs, setRecentSongs] = useState<HistorySong[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [notification, setNotification] = useState<Notification | null>(null);
  const isHost = checkIsHost(room, user);

  // Handle playback state updates from WebSocket
  const handlePlaybackUpdate = useCallback((playbackState: PlaybackState) => {
    const song = convertTrackToSong(playbackState.current_track);
    setCurrentSong(song);
    setPlaybackStartedAt(playbackState.playback_started_at);
    setBasePositionMs(playbackState.position_ms);

    setPlayerState((prev) => ({
      ...prev,
      currentTime: Math.floor(playbackState.position_ms / 1000),
      isPlaying: playbackState.is_playing,
    }));
  }, []);

  // Update current time every second when playing
  useEffect(() => {
    if (!playerState.isPlaying) return;

    const interval = setInterval(() => {
      const currentPositionMs = calculateCurrentPosition(
        playerState.isPlaying,
        playbackStartedAt,
        basePositionMs,
        currentSong?.duration_ms
      );
      setPlayerState((prev) => ({
        ...prev,
        currentTime: Math.floor(currentPositionMs / 1000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [playerState.isPlaying, playbackStartedAt, basePositionMs, currentSong]);

  // Handle queue updates from WebSocket
  const handleQueueUpdate = useCallback((queueData: QueueSongWS[], recentlyPlayedData: QueueSongWS[]) => {
    const convertedQueue: QueueSong[] = queueData.map((item) => ({
      ...item,
      song_id: item.id,
      likes: 0,
      dislikes: 0,
      addedBy: item.added_by.display_name,
    }));
    setQueue(convertedQueue);

    const convertedRecentSongs: HistorySong[] = recentlyPlayedData.map((item) => ({
      ...item,
      song_id: item.id,
      playedAt: new Date(),
      addedBy: item.added_by.display_name,
    }));
    setRecentSongs(convertedRecentSongs);
  }, []);

  // Handle member events
  const handleMemberJoined = useCallback(
    (userId: string, displayName: string, profileImageUrl: string, connectionCount: number) => {
      console.log(`${displayName} joined the room (${connectionCount} connections)`);
      // Optionally show a toast notification
    },
    []
  );

  const handleMemberLeft = useCallback(
    (userId: string, displayName: string, profileImageUrl: string, connectionCount: number) => {
      console.log(`${displayName} left the room (${connectionCount} connections)`);
      // Optionally show a toast notification
    },
    []
  );

  // Handle notifications
  const handleNotification = useCallback((notif: Notification) => {
    setNotification(notif);
    // Auto-clear notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // WebSocket connection
  useRoomWebSocket({
    roomCode: roomCode || '',
    userId: user?.id || '',
    onPlaybackUpdate: handlePlaybackUpdate,
    onQueueUpdate: handleQueueUpdate,
    onMemberJoined: handleMemberJoined,
    onMemberLeft: handleMemberLeft,
    onNotification: handleNotification,
  });

  useEffect(() => {
    const loadRoomDetails = async () => {
      if (!roomCode || !user) return;

      try {
        setIsLoading(true);
        setError(null);
        const roomData = await roomsService.getRoomDetails(roomCode);
        setRoom(roomData);

        // Check if user is already a member
        const isMember = roomData.members?.some((member) => member.spotify_id === user?.spotify_id);

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

        // Fetch initial playback state
        try {
          const playbackState = await playbackService.getPlaybackState(roomCode);
          handlePlaybackUpdate(playbackState);
        } catch (playbackErr) {
          console.log('No active playback state');
          // It's okay if there's no playback state yet
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

    if (!isHost) {
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

  const handleAddSong = async (song: SearchResult) => {
    if (!roomCode || !user?.spotify_id) {
      setError('Cannot add song: missing room or user information');
      return;
    }

    const { spotify_id, title, artist, album, album_art_url, duration_ms, spotify_uri } = song;

    try {
      await songsService.addSongToQueue({
        code: roomCode,
        spotify_track_id: spotify_id,
        title,
        artist,
        album,
        album_art_url,
        spotify_uri,
        duration_ms,
        user_spotify_id: user.spotify_id,
      });
      // Queue will be updated via WebSocket
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding song to queue');
      console.error('Error adding song:', err);
    }
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
      <BaseLayout>
        <div className='flex h-[calc(100dvh-61px)] items-center justify-center'>
          <div className='text-text-secondary'>Loading room...</div>
        </div>
      </BaseLayout>
    );
  }

  if (error && !room) {
    return (
      <BaseLayout>
        <div className='flex h-[calc(100dvh-61px)] flex-col items-center justify-center gap-4'>
          <div className='text-red-500'>{error}</div>
          <button
            onClick={() => navigate(ROUTES.ROOMS)}
            className='bg-primary hover:bg-primary/90 rounded-xl px-6 py-2 text-gray-900 transition'
          >
            Back to rooms
          </button>
        </div>
      </BaseLayout>
    );
  }

  if (isJoining) {
    return (
      <BaseLayout>
        <div className='flex h-[calc(100dvh-61px)] items-center justify-center'>
          <div className='text-text-secondary'>Joining the room...</div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className='flex h-[calc(100dvh-61px)] flex-col gap-4 overflow-hidden p-6'>
        {/* Room header with controls */}
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
        {notification && (
          <div
            className={`mt-4 rounded-xl border p-3 text-sm ${
              notification.level === 'error'
                ? 'border-red-500/20 bg-red-500/10 text-red-500'
                : notification.level === 'warning'
                  ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                  : 'border-blue-500/20 bg-blue-500/10 text-blue-500'
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className='flex min-h-0 flex-1 w-full flex-col gap-4 lg:flex-row'>
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
                currentSong={currentSong}
                playerState={playerState}
                onTogglePlay={handleTogglePlay}
                onSeek={handleSeek}
              />
            </div>
          </div>

          {/* Right column: Song queue */}
          <div className='flex h-full'>
            <SongQueueTabs
              queue={queue}
              recentSongs={recentSongs}
              sessions={MOCK_SESSIONS}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Room;
