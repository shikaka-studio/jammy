import type { Room } from '@/types/room';
import type { User } from '@/types/user';

/**
 * Checks if the current user is the host of a room
 */
export const checkIsHost = (room: Room | null, user: User | null | undefined): boolean => {
  if (!room || !user) return false;

  // First try with host_id (user UUID)
  if (room.host_id === user.id) return true;

  // If host object exists, compare with spotify_id
  if (room.host?.spotify_id === user.spotify_id) return true;

  return false;
};
