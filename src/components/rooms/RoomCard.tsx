import { Link } from 'react-router';
import { Users } from 'lucide-react';
import type { Room } from '@/types/room';
import { ROUTES } from '@/constants/routes';
import { ROOMS_PAGE_TEXTS } from '@/constants/room';
import { createImageErrorHandler, createPlaceholderImage } from '@/utils/image';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const handleImageError = createImageErrorHandler(room.name.substring(0, 2), '400x400');

  const usersCount = room.members?.length || 0;
  const defaultCoverImage = createPlaceholderImage(room.name.substring(0, 2), '400x400');

  return (
    <Link
      to={ROUTES.ROOM(room.room_code)}
      className='group bg-background-elevated hover:bg-surface-hover block rounded-2xl p-4 transition'
    >
      <div className='aspect-square overflow-hidden rounded-xl'>
        <img
          src={room.cover_image || defaultCoverImage}
          alt={room.name}
          className='h-full w-full object-cover transition group-hover:scale-105'
          onError={handleImageError}
        />
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
