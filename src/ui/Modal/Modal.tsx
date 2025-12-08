import { useEffect, useState, useRef, ReactNode, RefObject } from 'react';
import { X } from 'lucide-react';
import Button from '@/ui/Button';
import { MODAL_SIZE_CLASSES as sizeClasses } from './constants';
import type { ModalSize } from './types';

interface ModalProps {
  modalRef?: RefObject<HTMLDivElement>;
  isOpen: boolean;
  title?: string;
  size?: ModalSize;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalBody = ({ children, className = '' }: ModalBodyProps) => (
  <div className={`overflow-y-auto px-6 py-4 ${className}`}>{children}</div>
);

const ModalFooter = ({ children, className = '' }: ModalFooterProps) => (
  <div
    className={`bg-background-elevated-2 border-background-elevated-4 rounded-b-lg border-t px-6 py-4 ${className}`}
  >
    {children}
  </div>
);

const Modal = ({
  modalRef,
  isOpen,
  title,
  size = 'md',
  className = '',
  children,
  onClose,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const frozenContentRef = useRef<ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      // Capture current content when opening
      frozenContentRef.current = children;
      // Small delay to ensure initial render before animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }

    if (!isOpen && isVisible) {
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsVisible(false);
        frozenContentRef.current = null;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible, children]);

  if (!isVisible && !isOpen) return null;

  // Use frozen content during closing animation, live content otherwise
  const displayContent = isOpen ? children : frozenContentRef.current;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 ${
          isOpen && isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`bg-background-elevated relative flex max-h-full w-full flex-col rounded-lg shadow-lg ${sizeClasses[size]} transform transition-all duration-200 ${
          isOpen && isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } ${className}`}
      >
        <div
          className={`border-background-elevated-4 bg-background-elevated-2 flex shrink-0 items-start rounded-t-lg border-b py-3 pr-4 pl-6 ${title ? 'justify-between' : 'justify-end'}`}
        >
          {title && <h2 className='text-md text-text-primary font-semibold'>{title}</h2>}
          <Button
            className='text-text-secondary hover:text-text-primary cursor-pointer rounded transition-colors focus:outline-none'
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <div className='flex min-h-0 flex-1 flex-col'>{displayContent}</div>
      </div>
    </div>
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
