import { Link } from 'react-router';
import type { Room } from '@/types/room';
import { ROUTES } from '@/constants/routes';
import { ROOMS_PAGE_TEXTS } from '@/constants/room';

interface RoomCardProps {
    room: Room;
}

const UsersIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const RoomCard = ({ room }: RoomCardProps) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.src = `https://via.placeholder.com/400/231a30/ffffff?text=${encodeURIComponent(room.name.substring(0, 2))}`;
    };

    return (
        <Link
            to={ROUTES.ROOM(room.id)}
            className="group block rounded-2xl bg-background-elevated p-4 transition hover:bg-surface-hover"
        >
            <div className="aspect-square overflow-hidden rounded-xl">
                <img
                    src={room.coverImage}
                    alt={room.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    onError={handleImageError}
                />
            </div>
            <div className="mt-4 space-y-1">
                <h3 className="truncate text-base font-semibold text-text-primary">
                    {room.name}
                </h3>
                <p className="truncate text-sm text-text-secondary">
                    {room.currentSong.artist} - {room.currentSong.title}
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-text-secondary">
                    <UsersIcon />
                    <span className="text-sm">
                        {room.usersCount} {ROOMS_PAGE_TEXTS.USERS_LABEL}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default RoomCard;

