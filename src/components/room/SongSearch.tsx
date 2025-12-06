import { useState, useRef, useEffect } from 'react';
import type { SearchResult } from '@/types/room';
import { ROOM_TEXTS } from '@/constants/room';
import SearchResultItem from './SearchResultItem';

interface SongSearchProps {
  searchResults: SearchResult[];
  onSearch: (query: string) => void;
  onAddSong: (song: SearchResult) => void;
  isSearching?: boolean;
}

const DEBOUNCE_DELAY = 500; // 500ms

const SongSearch = ({ searchResults, onSearch, onAddSong, isSearching = false }: SongSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Clear timer when component unmounts
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If query is empty, clear results immediately
    if (value.trim().length === 0) {
      onSearch('');
      return;
    }

    // Create new timer for debounce
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value);
    }, DEBOUNCE_DELAY);
  };

  const handleAddSong = (song: SearchResult) => {
    onAddSong(song);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={ROOM_TEXTS.SEARCH_PLACEHOLDER}
          className="w-full rounded-full bg-surface py-3 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl bg-surface shadow-xl">
          <div className="max-h-80 overflow-y-auto p-2">
            {isSearching && (
              <p className="p-4 text-center text-sm text-text-secondary">
                Searching songs...
              </p>
            )}
            {!isSearching && searchResults.length === 0 && query.length > 0 && (
              <p className="p-4 text-center text-sm text-text-secondary">
                {ROOM_TEXTS.NO_RESULTS}
              </p>
            )}
            {!isSearching && searchResults.map((song) => (
              <SearchResultItem
                key={song.id}
                song={song}
                onAdd={handleAddSong}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default SongSearch;

