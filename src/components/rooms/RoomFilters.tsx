import type { RoomFilter } from '@/types/room';
import { BASE_ROOM_FILTERS } from '@/constants/room';

interface RoomFiltersProps {
    activeFilter: RoomFilter;
    availableTags: string[];
    onFilterChange: (filter: RoomFilter) => void;
}

const isFilterActive = (activeFilter: RoomFilter, type: string, value?: string): boolean => {
    if (activeFilter.type !== type) return false;
    if (type === 'tag') return activeFilter.value === value;
    return true;
};

const RoomFilters = ({ activeFilter, availableTags, onFilterChange }: RoomFiltersProps) => (
    <div className="flex flex-wrap gap-2">
        {BASE_ROOM_FILTERS.map((filter) => {
            const isActive = isFilterActive(activeFilter, filter.type);

            return (
                <button
                    key={filter.type}
                    onClick={() => onFilterChange({ type: filter.type as RoomFilter['type'] })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive
                            ? 'bg-white text-gray-900'
                            : 'bg-background-elevated text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        }`}
                >
                    {filter.label}
                </button>
            );
        })}

        {availableTags.map((tag) => {
            const isActive = isFilterActive(activeFilter, 'tag', tag);

            return (
                <button
                    key={tag}
                    onClick={() => onFilterChange({ type: 'tag', value: tag })}
                    className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${isActive
                            ? 'bg-white text-gray-900'
                            : 'bg-background-elevated text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        }`}
                >
                    {tag}
                </button>
            );
        })}
    </div>
);

export default RoomFilters;
