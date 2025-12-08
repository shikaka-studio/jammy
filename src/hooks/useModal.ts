import { useState, useRef, RefObject, useCallback } from 'react';
import useClickOutside from './useClickOutside';
import useScrollLock from './useLockScroll';
import useKeyPress from './useKeyPress';

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement | null>;
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { lock, unlock } = useScrollLock({ autoLock: false });

  const openModal = () => {
    setIsOpen(true);
    lock();
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    unlock();
  }, [unlock]);

  useClickOutside(modalRef as RefObject<HTMLElement>, () => {
    if (isOpen) {
      closeModal();
    }
  });

  useKeyPress('Escape', closeModal, isOpen);

  return { isOpen, openModal, closeModal, modalRef };
};

export default useModal;
