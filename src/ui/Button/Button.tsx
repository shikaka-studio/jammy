import { ReactNode, ButtonHTMLAttributes } from 'react';
import type { ButtonSize, ButtonVariant } from './types';
import { getButtonClasses } from './utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: boolean;
  full?: boolean;
  children: ReactNode;
}

const Button = ({
  type = 'button',
  className = '',
  size = 'md',
  variant = 'primary',
  rounded = false,
  full = false,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = className || getButtonClasses(size, variant, rounded, full);

  return (
    <button type={type} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
