import { useState } from 'react';
import RoomContent from '@/components/room/RoomContent';
import { SpotifyPlayerProvider } from '@/contexts/SpotifyPlayerContext';

const Room = () => {
  const [error, setError] = useState<string | null>(null);

  const handlePlayerReady = (deviceId: string) => {
    console.log('Spotify player ready with device ID:', deviceId);
  };

  const handlePlayerError = (err: Error) => {
    console.error('Spotify player error:', err);
    setError(err.message);
  };

  return (
    <SpotifyPlayerProvider onPlayerReady={handlePlayerReady} onPlayerError={handlePlayerError}>
      <RoomContent />
      {error && (
        <div className='fixed right-4 bottom-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500'>
          {error}
        </div>
      )}
    </SpotifyPlayerProvider>
  );
};

export default Room;
