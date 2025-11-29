import type { Song, PlayerState } from '@/types/room';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';

interface SongPlayerProps {
  currentSong: Song | null;
  playerState: PlayerState;
  onTogglePlay: () => void;
  onSeek?: (time: number) => void;
}

const SongPlayer = ({
  currentSong,
  playerState,
  onTogglePlay,
  onSeek,
}: SongPlayerProps) => {
  if (!currentSong) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-background-elevated p-4">
        <p className="text-text-secondary">No song is currently playing</p>
      </div>
    );
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.src = `https://via.placeholder.com/300/231a30/ffffff?text=${encodeURIComponent(currentSong.name)}`;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-background-elevated p-12">
      <img
        src={currentSong.albumCover}
        alt={currentSong.name}
        className="h-64 w-64 rounded-2xl object-cover shadow-xl"
        onError={handleImageError}
      />

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-text-primary">{currentSong.name}</h2>
        <p className="mt-1 text-text-secondary">{currentSong.artist}</p>
      </div>

      <div className="mt-4 w-full max-w-sm">
        <ProgressBar
          currentTime={playerState.currentTime}
          duration={currentSong.duration}
          onSeek={onSeek}
        />
      </div>

      <div className="mt-4">
        <PlayerControls
          isPlaying={playerState.isPlaying}
          onTogglePlay={onTogglePlay}
        />
      </div>
    </div>
  );
};

export default SongPlayer;

