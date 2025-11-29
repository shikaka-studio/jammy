import type { Room } from '@/types/room';
import RoomCard from './RoomCard';

interface RoomGridProps {
    rooms: Room[];
}

const RoomGrid = ({ rooms }: RoomGridProps) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
        ))}
    </div>
);

export default RoomGrid;

