import Toast from './Toast';
import type { Toast as ToastType } from '@/types/toast';

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className='pointer-events-none fixed top-20 right-4 z-30 flex w-full max-w-md flex-col gap-3'>
      <div className='pointer-events-auto flex flex-col gap-3'>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
