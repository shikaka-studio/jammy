import { useState, useEffect } from 'react';
import type { Song, PlayerState } from '@/types/room';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import { Music } from 'lucide-react';

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
  const [imageError, setImageError] = useState(false);

  // Reset image error when song changes
  useEffect(() => {
    setImageError(false);
  }, [currentSong?.id]);

  if (!currentSong) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background-elevated p-4">
        <p className="text-text-secondary">No song is currently playing</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-background-elevated p-12">
      {currentSong.album_art_url && !imageError ? (
        <img
          src={currentSong.album_art_url}
          alt={currentSong.title}
          className="h-64 w-64 rounded-2xl object-cover shadow-xl"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-linear-to-br from-purple-900 to-pink-900 shadow-xl">
          <Music className="h-32 w-32 text-white" strokeWidth={1.5} />
        </div>
      )}

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-text-primary">{currentSong.title}</h2>
        <p className="mt-1 text-text-secondary">{currentSong.artist}</p>
      </div>

      <div className="mt-4 w-full max-w-sm">
        <ProgressBar
          currentTime={playerState.currentTime}
          duration={Math.floor(currentSong.duration_ms / 1000)}
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

