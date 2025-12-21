import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Toast as ToastType } from '@/types/toast';
import { TOAST_VARIANTS, DEFAULT_TOAST_DURATION } from './constants';

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const variant = TOAST_VARIANTS[toast.type];
  const Icon = variant.icon;

  useEffect(() => {
    const duration = toast.duration ?? DEFAULT_TOAST_DURATION;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  return (
    <div
      className={`animate-in slide-in-from-right flex items-start gap-3 rounded-xl border p-4 text-sm shadow-lg transition-all duration-300 ${variant.className}`}
      role='alert'
    >
      <Icon className='mt-0.5 h-5 w-5 shrink-0' />
      <p className='flex-1 leading-relaxed'>{toast.message}</p>
      <button
        onClick={onClose}
        className='shrink-0 opacity-70 transition-opacity hover:opacity-100'
        aria-label='Close notification'
      >
        <X className='h-4 w-4' />
      </button>
    </div>
  );
};

export default Toast;
