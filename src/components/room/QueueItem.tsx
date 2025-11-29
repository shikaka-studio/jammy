import type { QueueSong } from '@/types/room';

interface QueueItemProps {
  song: QueueSong;
}

const QueueItem = ({ song }: QueueItemProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.src = `https://via.placeholder.com/48/231a30/ffffff?text=${encodeURIComponent(song.name.substring(0, 2))}`;
  };

  return (
    <div className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-surface-hover">
      <img
        src={song.albumCover}
        alt={song.name}
        className="h-12 w-12 rounded-md object-cover"
        onError={handleImageError}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{song.name}</p>
        <p className="truncate text-xs text-text-secondary">{song.artist}</p>
        <p className="truncate text-xs text-text-tertiary">Added by {song.addedBy}</p>
      </div>
    </div>
  );
};

export default QueueItem;

