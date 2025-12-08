import { useEffect, RefObject } from 'react';

/**
 * Custom hook that handles clicks outside a specified element.
 * @param ref - Reference to the element
 * @param callback - Callback function to execute when clicking outside
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
