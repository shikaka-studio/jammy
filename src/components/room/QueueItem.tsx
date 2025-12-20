import { useState } from 'react';
import type { QueueSong, HistorySong } from '@/types/room';
import { Music } from 'lucide-react';

interface QueueItemProps {
  song: QueueSong | HistorySong;
}

const QueueItem = ({ song }: QueueItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-surface-hover">
      {song.album_art_url && !imageError ? (
        <img
          src={song.album_art_url}
          alt={song.title}
          className="h-12 w-12 rounded-md object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-linear-to-br from-purple-900 to-pink-900">
          <Music className="h-6 w-6 text-white" strokeWidth={1.5} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{song.title}</p>
        <p className="truncate text-xs text-text-secondary">{song.artist}</p>
        <p className="truncate text-xs text-text-tertiary">Added by {song.addedBy}</p>
      </div>
    </div>
  );
};

export default QueueItem;

