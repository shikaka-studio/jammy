import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const Link = ({ href, children, className }: LinkProps) => {
  return (
    <a href={href} className={className ?? 'text-text-primary hover:text-primary transition'}>
      {children}
    </a>
  );
};

export default Link;
