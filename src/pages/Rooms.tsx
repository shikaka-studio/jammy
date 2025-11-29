import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import Container from '@/ui/Container';
import RoomsHeader from '@/components/rooms/RoomsHeader';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomGrid from '@/components/rooms/RoomGrid';
import CreateRoomModal from '@/components/rooms/CreateRoomModal';
import type { Room, RoomFilter, CreateRoomFormData } from '@/types/room';

const MOCK_ROOMS: Room[] = [
    {
        id: '1',
        name: 'Sala de Rock de los 90',
        coverImage: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=400&fit=crop',
        currentSong: { artist: 'Nirvana', title: 'Smells Like Teen Spirit' },
        usersCount: 5,
        tags: ['rock', '90s', 'grunge'],
        createdAt: new Date('2025-11-20'),
    },
    {
        id: '2',
        name: 'Indie Chill Vibes',
        coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop',
        currentSong: { artist: 'Tame Impala', title: 'The Less I Know The Better' },
        usersCount: 12,
        tags: ['indie', 'chill', 'alternativo'],
        createdAt: new Date('2025-11-25'),
    },
    {
        id: '3',
        name: 'Fiesta Latina',
        coverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop',
        currentSong: { artist: 'Bad Bunny', title: 'Tití Me Preguntó' },
        usersCount: 8,
        tags: ['latina', 'reggaeton', 'fiesta'],
        createdAt: new Date('2025-11-28'),
    },
    {
        id: '4',
        name: 'Lo-fi para Estudiar',
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
        currentSong: { artist: 'potsu', title: "i'm closing my eyes" },
        usersCount: 25,
        tags: ['lofi', 'estudio', 'chill', 'relax'],
        createdAt: new Date('2025-11-15'),
    },
    {
        id: '5',
        name: 'Éxitos de los 80',
        coverImage: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&h=400&fit=crop',
        currentSong: { artist: 'A-ha', title: 'Take on Me' },
        usersCount: 3,
        tags: ['pop', '80s', 'retro'],
        createdAt: new Date('2025-11-10'),
    },
    {
        id: '6',
        name: 'Top 50 Global',
        coverImage: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=400&h=400&fit=crop',
        currentSong: { artist: 'Taylor Swift', title: 'Fortnight' },
        usersCount: 18,
        tags: ['pop', 'hits', 'global'],
        createdAt: new Date('2025-11-29'),
    },
];

const getAllTags = (rooms: Room[]): string[] => {
    const tagsSet = new Set<string>();
    rooms.forEach((room) => room.tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
};

const filterRooms = (rooms: Room[], filter: RoomFilter): Room[] => {
    if (filter.type === 'all') {
        return rooms;
    }

    if (filter.type === 'popular') {
        return [...rooms].sort((a, b) => b.usersCount - a.usersCount);
    }

    if (filter.type === 'recent') {
        return [...rooms].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    if (filter.type === 'tag' && filter.value) {
        return rooms.filter((room) => room.tags.includes(filter.value!));
    }

    return rooms;
};

const Rooms = () => {
    const [activeFilter, setActiveFilter] = useState<RoomFilter>({ type: 'all' });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const availableTags = useMemo(() => getAllTags(MOCK_ROOMS), []);

    const filteredRooms = useMemo(
        () => filterRooms(MOCK_ROOMS, activeFilter),
        [activeFilter]
    );

    const handleCreateRoom = (data: CreateRoomFormData) => {
        // TODO: Implementar lógica de creación de sala con API
        console.log('Creating room:', data);
    };

    return (
        <Layout>
            <Container>
                <div className="space-y-8 py-12">
                    <RoomsHeader onCreateRoom={() => setIsCreateModalOpen(true)} />
                    <RoomFilters
                        activeFilter={activeFilter}
                        availableTags={availableTags}
                        onFilterChange={setActiveFilter}
                    />
                    <RoomGrid rooms={filteredRooms} />
                </div>
            </Container>

            <CreateRoomModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateRoom}
                availableTags={availableTags}
            />
        </Layout>
    );
};

export default Rooms;
