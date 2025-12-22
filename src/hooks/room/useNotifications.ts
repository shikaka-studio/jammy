import { useState, useRef, useCallback, useEffect } from 'react';
import type { Notification } from '@/types/websocket';

interface UseNotificationsReturn {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

const AUTO_CLEAR_DELAY = 5000; // 5 seconds

const useNotifications = (): UseNotificationsReturn => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearNotification = useCallback(() => {
    setNotification(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showNotification = useCallback((notif: Notification) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification(notif);

    // Auto-clear after delay
    timeoutRef.current = setTimeout(() => {
      setNotification(null);
      timeoutRef.current = null;
    }, AUTO_CLEAR_DELAY);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    notification,
    showNotification,
    clearNotification,
  };
};

export default useNotifications;
