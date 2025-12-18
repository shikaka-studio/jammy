import type { SearchResult } from '@/types/room';
import { ROOM_TEXTS } from '@/constants/room';
import { createImageErrorHandler } from '@/utils/image';

interface SearchResultItemProps {
  song: SearchResult;
  onAdd: (song: SearchResult) => void;
}

const SearchResultItem = ({ song, onAdd }: SearchResultItemProps) => {
  const handleImageError = createImageErrorHandler(song.name.substring(0, 2), '48x48');

  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-surface-hover">
      <img
        src={song.albumCover}
        alt={song.name}
        className="h-12 w-12 rounded-md object-cover"
        onError={handleImageError}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{song.name}</p>
        <p className="truncate text-xs text-text-secondary">{song.artist}</p>
      </div>
      <button
        onClick={() => onAdd(song)}
        className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-gray-900 transition hover:scale-105 active:scale-95"
      >
        {ROOM_TEXTS.ADD_BUTTON}
      </button>
    </div>
  );
};

export default SearchResultItem;

