import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/useToast';
import { roomsService } from '@/services/rooms';
import { checkIsHost } from '@/utils/room';
import { ROUTES } from '@/constants/routes';
import type { Room } from '@/types/room';

interface UseRoomDataOptions {
  roomCode: string | undefined;
  userId: string | undefined;
  userSpotifyId: string | undefined;
}

interface UseRoomDataReturn {
  room: Room | null;
  isLoading: boolean;
  isJoining: boolean;
  isHost: boolean;
  leaveRoom: () => Promise<void>;
  closeRoom: () => Promise<void>;
}

const useRoomData = ({
  roomCode,
  userId,
  userSpotifyId,
}: UseRoomDataOptions): UseRoomDataReturn => {
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const { addToast } = useToast();

  const isHost = checkIsHost(room, { id: userId, spotify_id: userSpotifyId } as any);

  // Load room details and auto-join if not a member
  useEffect(() => {
    const loadRoomDetails = async () => {
      if (!roomCode || !userId) return;

      try {
        setIsLoading(true);
        const roomData = await roomsService.getRoomDetails(roomCode);
        setRoom(roomData);

        // Check if user is already a member
        const isMember = roomData.members?.some((member) => member.spotify_id === userSpotifyId);

        // If not a member, join automatically
        if (!isMember && userSpotifyId) {
          try {
            setIsJoining(true);
            const updatedRoom = await roomsService.joinRoom(roomCode, userSpotifyId);
            setRoom(updatedRoom);
          } catch (joinErr) {
            addToast(
              joinErr instanceof Error ? joinErr.message : 'Error joining the room',
              'error'
            );
            console.error('Error joining room:', joinErr);
          } finally {
            setIsJoining(false);
          }
        }
      } catch (err) {
        addToast(err instanceof Error ? err.message : 'Error loading room', 'error');
        console.error('Error loading room:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userId) {
      addToast('You must log in to access a room', 'error');
      setIsLoading(false);
      return;
    }

    if (roomCode) {
      loadRoomDetails();
    }
  }, [roomCode, userId, userSpotifyId]);

  const leaveRoom = useCallback(async () => {
    if (!userSpotifyId) {
      addToast('You must log in to leave the room', 'error');
      return;
    }

    if (!roomCode) return;

    const confirmLeave = window.confirm('Are you sure you want to leave this room?');
    if (!confirmLeave) return;

    try {
      await roomsService.leaveRoom(roomCode, userSpotifyId);
      navigate(ROUTES.ROOMS);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Error leaving room', 'error');
      console.error('Error leaving room:', err);
    }
  }, [roomCode, userSpotifyId, navigate]);

  const closeRoom = useCallback(async () => {
    if (!userSpotifyId) {
      addToast('You must log in to close the room', 'error');
      return;
    }

    if (!roomCode || !room) return;

    if (!isHost) {
      addToast('Only the host can close the room', 'error');
      return;
    }

    const confirmClose = window.confirm(
      'Are you sure you want to close this room? All members will be disconnected.'
    );
    if (!confirmClose) return;

    try {
      await roomsService.closeRoom(roomCode, userSpotifyId);
      navigate(ROUTES.ROOMS);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Error closing room', 'error');
      console.error('Error closing room:', err);
    }
  }, [roomCode, userSpotifyId, room, isHost, navigate]);

  return {
    room,
    isLoading,
    isJoining,
    isHost,
    leaveRoom,
    closeRoom,
  };
};

export default useRoomData;
