import { useState, useEffect } from 'react';
import type { Song, PlayerState } from '@/types/room';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import { Music, AlertTriangle } from 'lucide-react';
import { PREMIUM_WARNING } from '@/constants/common';

interface SongPlayerProps {
  currentSong: Song | null;
  playerState: PlayerState;
  onTogglePlay: () => void;
  onSeek?: (time: number) => void;
  isHost: boolean;
  isPremium: boolean;
}

const SongPlayer = ({
  currentSong,
  playerState,
  onTogglePlay,
  onSeek,
  isHost,
  isPremium,
}: SongPlayerProps) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error when song changes
  useEffect(() => {
    setImageError(false);
  }, [currentSong?.id]);

  if (!currentSong) {
    return (
      <div className='bg-background-elevated flex h-full w-full items-center justify-center rounded-2xl p-4'>
        <p className='text-text-secondary'>No song is currently playing</p>
      </div>
    );
  }

  return (
    <div className='bg-background-elevated flex h-full w-full flex-col items-center justify-center rounded-2xl p-12'>
      {currentSong.album_art_url && !imageError ? (
        <img
          src={currentSong.album_art_url}
          alt={currentSong.title}
          className='h-64 w-64 rounded-2xl object-cover shadow-xl'
          onError={() => setImageError(true)}
        />
      ) : (
        <div className='flex h-64 w-64 items-center justify-center rounded-2xl bg-linear-to-br from-purple-900 to-pink-900 shadow-xl'>
          <Music className='h-32 w-32 text-white' strokeWidth={1.5} />
        </div>
      )}

      <div className='mt-4 text-center'>
        <h2 className='text-text-primary text-2xl font-bold'>{currentSong.title}</h2>
        <p className='text-text-secondary mt-1'>{currentSong.artist}</p>
      </div>

      <div className='mt-4 w-full max-w-sm'>
        <ProgressBar
          currentTime={playerState.currentTime}
          duration={Math.floor(currentSong.duration_ms / 1000)}
          onSeek={isHost ? onSeek : undefined}
        />
      </div>

      {isHost && (
        <div className='mt-4'>
          <PlayerControls isPlaying={playerState.isPlaying} onTogglePlay={onTogglePlay} />
        </div>
      )}

      {!isPremium && (
        <div className='mt-8 flex w-full max-w-md items-start gap-3 rounded-xl border border-yellow-500/60 bg-yellow-950/60 p-4 text-sm'>
          <AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-yellow-400' />
          <div className='flex-1 text-yellow-400'>
            <p className='font-semibold'>{PREMIUM_WARNING.TITLE}</p>
            <p className='mt-1 text-yellow-400/80'>{PREMIUM_WARNING.MESSAGE}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongPlayer;
