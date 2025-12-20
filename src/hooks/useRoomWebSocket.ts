import { useEffect, useRef, useCallback, useState } from 'react';
import { WS_URL } from '@/constants/api';
import type { WebSocketMessage, PlaybackState, QueueSongWS, Notification } from '@/types/websocket';

interface UseRoomWebSocketOptions {
  roomCode: string;
  userId: string;
  onPlaybackUpdate?: (state: PlaybackState) => void;
  onQueueUpdate?: (queue: QueueSongWS[], recentlyPlayed: QueueSongWS[]) => void;
  onMemberJoined?: (userId: string, displayName: string, profileImageUrl: string, connectionCount: number) => void;
  onMemberLeft?: (userId: string, displayName: string, profileImageUrl: string, connectionCount: number) => void;
  onNotification?: (notification: Notification) => void;
}

export const useRoomWebSocket = ({
  roomCode,
  userId,
  onPlaybackUpdate,
  onQueueUpdate,
  onMemberJoined,
  onMemberLeft,
  onNotification,
}: UseRoomWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Store callbacks in refs to avoid reconnections when they change
  const callbacksRef = useRef({
    onPlaybackUpdate,
    onQueueUpdate,
    onMemberJoined,
    onMemberLeft,
    onNotification,
  });

  // Update refs when callbacks change
  useEffect(() => {
    callbacksRef.current = {
      onPlaybackUpdate,
      onQueueUpdate,
      onMemberJoined,
      onMemberLeft,
      onNotification,
    };
  }, [onPlaybackUpdate, onQueueUpdate, onMemberJoined, onMemberLeft, onNotification]);

  const connect = useCallback(() => {
    if (!roomCode || !userId) return;

    // Prevent creating multiple connections
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      console.log('WebSocket already connected or connecting');
      return;
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    try {
      const wsUrl = `${WS_URL}/ws/${roomCode}?user_id=${userId}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          switch (message.type) {
            case 'playback_state':
              callbacksRef.current.onPlaybackUpdate?.(message.data);
              break;
            case 'queue_update':
              callbacksRef.current.onQueueUpdate?.(message.data.queue, message.data.recently_played);
              break;
            case 'member_joined':
              callbacksRef.current.onMemberJoined?.(
                message.data.user_id,
                message.data.display_name,
                message.data.profile_image_url,
                message.data.connection_count
              );
              break;
            case 'member_left':
              callbacksRef.current.onMemberLeft?.(
                message.data.user_id,
                message.data.display_name,
                message.data.profile_image_url,
                message.data.connection_count
              );
              break;
            case 'notification':
              callbacksRef.current.onNotification?.(message.data);
              break;
            default:
              console.warn('Unknown message type:', message);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('WebSocket connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, 3000);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setConnectionError('Failed to create WebSocket connection');
    }
  }, [roomCode, userId]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionError,
    disconnect,
    reconnect: connect,
  };
};
