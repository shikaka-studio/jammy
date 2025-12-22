import RoomContent from '@/components/room/RoomContent';
import { SpotifyPlayerProvider } from '@/contexts/SpotifyPlayerContext';

const Room = () => (
  <SpotifyPlayerProvider>
    <RoomContent />
  </SpotifyPlayerProvider>
);

export default Room;
