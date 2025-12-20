import type { Room } from '@/types/room';
import type { User } from '@/types/user';

/**
 * Checks if the current user is the host of a room
 */
export const checkIsHost = (room: Room | null, user: User | null | undefined): boolean => {
  if (!room || !user) return false;

  // Check if user's ID matches the host_id
  return room.host_id === user.id;
};
