import { useEffect } from 'react';

/**
 * Custom hook that listens for specific keyboard events
 * @param key - The keyboard key to listen for (e.g., 'Escape', 'Enter', 'a')
 * @param callback - Function to call when the key is pressed
 * @param enabled - Whether the listener is active (default: true)
 */
const useKeyPress = (key: string, callback: (event: KeyboardEvent) => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, callback, enabled]);
};

export default useKeyPress;
