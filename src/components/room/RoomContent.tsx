import { useState, useCallback } from 'react';
import { useParams } from 'react-router';
import BaseLayout from '@/components/layout/BaseLayout';
import SongSearch from '@/components/room/SongSearch';
import SongPlayer from '@/components/room/SongPlayer';
import SongQueueTabs from '@/components/room/SongQueueTabs';
import RoomHeader from '@/components/room/RoomHeader';
import { useAuthStore } from '@/stores/auth';
import { useRoomWebSocket } from '@/hooks/room/useRoomWebSocket';
import { useSpotifyPlayer } from '@/hooks/room/useSpotifyPlayer';
import { useToast } from '@/hooks/useToast';
import useRoomData from '@/hooks/room/useRoomData';
import usePlaybackSync from '@/hooks/room/usePlaybackSync';
import useSongSearch from '@/hooks/room/useSongSearch';
import type { QueueSong, ChatMessage, HistorySong } from '@/types/room';
import type { QueueSongWS, Notification } from '@/types/websocket';
import { MOCK_CHAT_MESSAGES } from '@/constants/mockData';

const RoomContent = () => {
  const [queue, setQueue] = useState<QueueSong[]>([]);
  const [recentSongs, setRecentSongs] = useState<HistorySong[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const { id: roomCode } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const spotifyPlayer = useSpotifyPlayer();
  const { addToast } = useToast();

  const roomData = useRoomData({
    roomCode,
    userId: user?.id,
    userSpotifyId: user?.spotify_id,
  });

  const playback = usePlaybackSync({
    roomCode,
    spotifyPlayer,
  });

  const search = useSongSearch({
    roomCode,
    userSpotifyId: user?.spotify_id,
  });

  // WebSocket notification handler
  const handleNotification = useCallback(
    (notification: Notification) => {
      addToast(notification.message, notification.level);
    },
    [addToast]
  );

  // WebSocket handlers
  const handleQueueUpdate = useCallback(
    (queueData: QueueSongWS[], recentlyPlayedData: QueueSongWS[]) => {
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
    },
    []
  );

  const handleMemberJoined = useCallback(
    (_userId: string, displayName: string, _profileImageUrl: string, connectionCount: number) => {
      console.log(`${displayName} joined the room (${connectionCount} connections)`);
    },
    []
  );

  const handleMemberLeft = useCallback(
    (_userId: string, displayName: string, _profileImageUrl: string, connectionCount: number) => {
      console.log(`${displayName} left the room (${connectionCount} connections)`);
    },
    []
  );

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

  // WebSocket connection
  useRoomWebSocket({
    roomCode: roomCode || '',
    userId: user?.id || '',
    onPlaybackUpdate: playback.handlePlaybackUpdate,
    onQueueUpdate: handleQueueUpdate,
    onMemberJoined: handleMemberJoined,
    onMemberLeft: handleMemberLeft,
    onNotification: handleNotification,
  });

  // Loading states
  if (roomData.isLoading) {
    return (
      <BaseLayout>
        <div className='flex h-[calc(100dvh-61px)] items-center justify-center'>
          <div className='text-text-secondary'>Loading room...</div>
        </div>
      </BaseLayout>
    );
  }

  if (roomData.isJoining) {
    return (
      <BaseLayout>
        <div className='flex h-[calc(100dvh-61px)] items-center justify-center'>
          <div className='text-text-secondary'>Joining the room...</div>
        </div>
      </BaseLayout>
    );
  }

  // Main UI
  return (
    <BaseLayout>
      <div className='flex h-[calc(100dvh-61px)] flex-col gap-4 overflow-hidden p-6'>
        <RoomHeader
          roomName={roomData.room?.name}
          memberCount={roomData.room?.members?.length || 0}
          isHost={roomData.isHost}
          onLeaveRoom={roomData.leaveRoom}
          onCloseRoom={roomData.closeRoom}
        />

        <div className='flex min-h-0 w-full flex-1 flex-col gap-4 lg:flex-row'>
          {/* Left column: Search and Player */}
          <div className='flex flex-1 flex-col gap-4' style={{ flex: '3' }}>
            <SongSearch
              searchResults={search.searchResults}
              onSearch={search.handleSearch}
              onAddSong={search.handleAddSong}
              isSearching={search.isSearching}
            />

            <div className='flex flex-1'>
              <SongPlayer
                currentSong={playback.currentSong}
                playerState={playback.playerState}
                onTogglePlay={playback.handleTogglePlay}
                onSeek={playback.handleSeek}
              />
            </div>
          </div>

          {/* Right column: Song queue */}
          <div className='flex h-full'>
            <SongQueueTabs
              queue={queue}
              recentSongs={recentSongs}
              sessions={[]}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default RoomContent;
