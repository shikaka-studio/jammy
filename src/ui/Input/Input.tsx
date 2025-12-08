import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className = '', error, icon, ...props }, ref) => {
    const hasError = !!error;

    const inputClasses = className
      ? className
      : `block w-full py-3 ${icon ? 'pl-4 pr-8' : 'px-4'} rounded-lg text-zinc-300 font-medium border ${
          hasError ? 'border-red-500' : 'border-border'
        } placeholder:text-zinc-500 text-sm focus:outline-none ${
          hasError ? 'focus:border-red-500' : 'focus:border-gray-400'
        } bg-background-elevated-2 read-only:cursor-not-allowed read-only:bg-gray-100 read-only:focus:bg-gray-100`;

    return (
      <div className='flex w-full flex-col gap-y-1'>
        <div className='relative'>
          <input ref={ref} type={type} className={inputClasses} {...props} />
          {icon && <div className='absolute top-1/2 right-2 -translate-y-1/2'>{icon}</div>}
        </div>
        {hasError && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    );
  }
);

export default Input;
