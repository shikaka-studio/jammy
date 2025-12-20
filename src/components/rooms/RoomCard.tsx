import { Link } from 'react-router';
import { Users, Music } from 'lucide-react';
import type { Room } from '@/types/room';
import { ROUTES } from '@/constants/routes';
import { ROOMS_PAGE_TEXTS } from '@/constants/room';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const usersCount = room.members?.length || 0;

  return (
    <Link
      to={ROUTES.ROOM(room.code)}
      className='group bg-background-elevated hover:bg-surface-hover block rounded-2xl p-4 transition'
    >
      <div className='aspect-square overflow-hidden rounded-xl'>
        {room.cover_image_url ? (
          <img
            src={room.cover_image_url}
            alt={room.name}
            className='h-full w-full object-cover transition group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-purple-900 to-pink-900'>
            <Music className='h-24 w-24 text-white' strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className='mt-4 space-y-1'>
        <h3 className='text-text-primary truncate text-base font-semibold'>{room.name}</h3>
        {room.current_track_uri ? (
          <p className='text-text-secondary truncate text-sm'>Playing music</p>
        ) : (
          <p className='text-text-secondary truncate text-sm'>No active music</p>
        )}
        <div className='text-text-secondary flex items-center gap-1.5 pt-1'>
          <Users className='h-4 w-4' />
          <span className='text-sm'>
            {usersCount} {ROOMS_PAGE_TEXTS.USERS_LABEL}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
