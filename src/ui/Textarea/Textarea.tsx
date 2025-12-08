import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, resize = 'vertical', className = '', ...props }, ref) => {
    const hasError = !!error;
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const baseStyles = `
      w-full
      rounded-lg
      bg-background-elevated-2
      border
      px-4
      py-3
      text-zinc-300
      text-sm
      placeholder:text-zinc-500
      focus:outline-none
      read-only:cursor-not-allowed
      read-only:bg-gray-100
      read-only:focus:bg-gray-100
      ${resizeClasses[resize]}
    `;

    const stateStyles = hasError
      ? 'border-red-500 focus:border-red-500'
      : 'border-border focus:border-gray-400';

    return (
      <div className='flex w-full flex-col gap-y-1'>
        <textarea ref={ref} className={`${baseStyles} ${stateStyles} ${className}`} {...props} />

        {hasError && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    );
  }
);

export default Textarea;
