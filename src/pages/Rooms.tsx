import { useState, useMemo, useEffect, RefObject } from 'react';
import { useToast } from '@/hooks/useToast';
import BaseLayout from '@/components/layout/BaseLayout';
import Container from '@/ui/Container';
import RoomsHeader from '@/components/rooms/RoomsHeader';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomGrid from '@/components/rooms/RoomGrid';
import CreateRoomModal from '@/components/rooms/CreateRoomModal';
import useModal from '@/hooks/useModal';
import type { Room, RoomFilter, CreateRoomFormData } from '@/types/room';
import { roomsService } from '@/services/rooms';
import { useAuthStore } from '@/stores/auth';

const getAllTags = (rooms: Room[]): string[] => {
  const tagsSet = new Set<string>();

  rooms.forEach(({ tags }) => {
    if (tags && Array.isArray(tags)) {
      tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
};

const filterRooms = (rooms: Room[], filter: RoomFilter): Room[] => {
  if (filter.type === 'all') {
    return rooms;
  }

  if (filter.type === 'popular') {
    return [...rooms].sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0));
  }

  if (filter.type === 'recent') {
    return [...rooms].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (filter.type === 'tag' && filter.value) {
    return rooms.filter(
      (room) => room.tags && Array.isArray(room.tags) && room.tags.includes(filter.value!)
    );
  }

  return rooms;
};

const Rooms = () => {
  const [activeFilter, setActiveFilter] = useState<RoomFilter>({ type: 'all' });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { modalRef, isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();
  const { addToast } = useToast();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await roomsService.getRooms();
      setRooms(data);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Error loading rooms', 'error');
      console.error('Error loading rooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const availableTags = useMemo(() => getAllTags(rooms), [rooms]);

  const filteredRooms = useMemo(() => filterRooms(rooms, activeFilter), [rooms, activeFilter]);

  const handleCreateRoom = async (data: CreateRoomFormData) => {
    if (!user?.spotify_id) {
      addToast('You must log in to create a room', 'error');
      return;
    }

    try {
      const newRoom = await roomsService.createRoom(data, user.spotify_id);
      setRooms((prev) => [newRoom, ...prev]);
      closeModal();
      addToast('Room created successfully!', 'success');
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Error creating room', 'error');
      console.error('Error creating room:', err);
    }
  };

  const handleCreateRoomClick = () => {
    if (!user) {
      addToast('You must log in to create a room', 'error');
      return;
    }
    openModal();
  };

  return (
    <BaseLayout>
      <Container>
        <div className='space-y-8 py-12'>
          <RoomsHeader onCreateRoom={handleCreateRoomClick} />

          <RoomFilters
            activeFilter={activeFilter}
            availableTags={availableTags}
            onFilterChange={setActiveFilter}
          />

          {isLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-text-secondary'>Loading rooms...</div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className='flex items-center justify-center py-20'>
              <div className='space-y-2 text-center'>
                <p className='text-text-secondary'>No rooms available</p>
              </div>
            </div>
          ) : (
            <RoomGrid rooms={filteredRooms} />
          )}
        </div>
      </Container>

      <CreateRoomModal
        modalRef={modalRef as RefObject<HTMLDivElement>}
        isOpen={isOpen}
        availableTags={availableTags}
        onClose={closeModal}
        onSubmit={handleCreateRoom}
      />
    </BaseLayout>
  );
};

export default Rooms;
