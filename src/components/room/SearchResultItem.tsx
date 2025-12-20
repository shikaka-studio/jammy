import { useState } from 'react';
import type { SearchResult } from '@/types/room';
import { ROOM_TEXTS } from '@/constants/room';
import { Music } from 'lucide-react';

interface SearchResultItemProps {
  song: SearchResult;
  onAdd: (song: SearchResult) => void;
}

const SearchResultItem = ({ song, onAdd }: SearchResultItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-surface-hover">
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

