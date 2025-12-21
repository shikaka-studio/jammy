import RoomContent from '@/components/room/RoomContent';
import { SpotifyPlayerProvider } from '@/contexts/SpotifyPlayerContext';

const Room = () => {
  const handlePlayerReady = (deviceId: string) => {
    console.log('Spotify player ready with device ID:', deviceId);
  };

  return (
    <SpotifyPlayerProvider onPlayerReady={handlePlayerReady}>
      <RoomContent />
    </SpotifyPlayerProvider>
  );
};

export default Room;
