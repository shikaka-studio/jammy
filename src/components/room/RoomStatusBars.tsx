import type { Notification } from '@/types/websocket';

interface RoomStatusBarsProps {
  error: string | null;
  notification: Notification | null;
  spotifyPlayerReady: boolean;
  spotifyPlayerError: string | null;
}

const RoomStatusBars = ({ error, notification, spotifyPlayerReady, spotifyPlayerError }: RoomStatusBarsProps) => {
  return (
    <>
      {error && (
        <div className='rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500'>
          {error}
        </div>
      )}
      {notification && (
        <div
          className={`rounded-xl border p-3 text-sm ${
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
      {!spotifyPlayerReady && !spotifyPlayerError && (
        <div className='rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-sm text-blue-500'>
          Initializing Spotify player...
        </div>
      )}
      {spotifyPlayerError && (
        <div className='rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-sm text-yellow-500'>
          Spotify Player: {spotifyPlayerError}
        </div>
      )}
    </>
  );
};

export default RoomStatusBars;
