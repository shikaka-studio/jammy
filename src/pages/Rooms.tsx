import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Container from '@/ui/Container';
import RoomsHeader from '@/components/rooms/RoomsHeader';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomGrid from '@/components/rooms/RoomGrid';
import CreateRoomModal from '@/components/rooms/CreateRoomModal';
import type { Room, RoomFilter, CreateRoomFormData } from '@/types/room';
import { roomsService } from '@/services/rooms';
import { useAuthStore } from '@/stores/auth';

const getAllTags = (rooms: Room[]): string[] => {
    const tagsSet = new Set<string>();
    rooms.forEach((room) => {
        if (room.tags) {
            room.tags.forEach((tag) => tagsSet.add(tag));
        }
    });
    return Array.from(tagsSet).sort();
};

const filterRooms = (rooms: Room[], filter: RoomFilter): Room[] => {
    if (filter.type === 'all') {
        return rooms;
    }

    if (filter.type === 'popular') {
        return [...rooms].sort((a, b) => b.members.length - a.members.length);
    }

    if (filter.type === 'recent') {
        return [...rooms].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (filter.type === 'tag' && filter.value) {
        return rooms.filter((room) => room.tags?.includes(filter.value!));
    }

    return rooms;
};

const Rooms = () => {
    const [activeFilter, setActiveFilter] = useState<RoomFilter>({ type: 'all' });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuthStore();

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await roomsService.getRooms();
            setRooms(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las salas');
            console.error('Error loading rooms:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const availableTags = useMemo(() => getAllTags(rooms), [rooms]);

    const filteredRooms = useMemo(
        () => filterRooms(rooms, activeFilter),
        [rooms, activeFilter]
    );

    const handleCreateRoom = async (data: CreateRoomFormData) => {
        if (!user?.spotify_id) {
            setError('Debes iniciar sesión para crear una sala');
            return;
        }

        try {
            setError(null);
            const newRoom = await roomsService.createRoom(data.name, user.spotify_id);
            setRooms((prev) => [newRoom, ...prev]);
            setIsCreateModalOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la sala');
            console.error('Error creating room:', err);
        }
    };

    const handleCreateRoomClick = () => {
        if (!user) {
            setError('Debes iniciar sesión para crear una sala');
            return;
        }
        setIsCreateModalOpen(true);
    };

    return (
        <Layout>
            <Container>
                <div className="space-y-8 py-12">
                    <RoomsHeader onCreateRoom={handleCreateRoomClick} />

                    {error && (
                        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <RoomFilters
                        activeFilter={activeFilter}
                        availableTags={availableTags}
                        onFilterChange={setActiveFilter}
                    />

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-text-secondary">Cargando salas...</div>
                        </div>
                    ) : filteredRooms.length === 0 ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center space-y-2">
                                <p className="text-text-secondary">No hay salas disponibles</p>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="text-primary hover:text-primary/80 transition"
                                >
                                    Crear la primera sala
                                </button>
                            </div>
                        </div>
                    ) : (
                        <RoomGrid rooms={filteredRooms} />
                    )}
                </div>
            </Container>

            <CreateRoomModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setError(null);
                }}
                onSubmit={handleCreateRoom}
                availableTags={availableTags}
            />
        </Layout>
    );
};

export default Rooms;
