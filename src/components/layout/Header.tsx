import { useState, useEffect } from 'react';
import JammyIcon from '@/icons/JammyIcon';
import { HEADER_LINKS } from '@/constants/layout';
import HeaderUser from './HeaderUser';

interface HeaderProps {
  isLanding: boolean;
}

const Header = ({ isLanding = false }: HeaderProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  const toggleNavlinks = () => {
    setIsToggled(!isToggled);
  };

  const handleLinkClick = () => {
    setIsToggled(false);
  };

  const headerClasses = [
    'sticky',
    'top-0',
    'z-40',
    'flex-none',
    'mx-auto',
    'px-6',
    'md:px-12',
    'xl:px-6',
    'w-full',
    'transition-[background-color]',
    'ease-in-out',
    isLanding && isScrolled ? 'backdrop-blur-md bg-background/80' : 'bg-transparent',
    !isLanding ? 'scroll' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'relative',
    'flex',
    'flex-wrap',
    'items-center',
    'justify-between',
    'gap-6',
    'py-3',
    'md:gap-0',
    'md:py-3',
    isLanding ? 'max-w-7xl mx-auto' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const navClasses = [
    'absolute',
    'top-full',
    'left-0',
    'z-20',
    'w-full',
    'origin-top-right',
    'flex-col',
    'flex-wrap',
    'justify-end',
    'gap-6',
    'rounded-3xl',
    'border',
    'p-8',
    'transition-all',
    'duration-300',
    'border-gray-700',
    'bg-background-elevated-2',
    'shadow-none',
    'lg:visible',
    'lg:relative',
    'lg:flex',
    'lg:w-7/12',
    'lg:translate-y-0',
    'lg:scale-100',
    'lg:flex-row',
    'lg:items-center',
    'lg:gap-0',
    'lg:border-none',
    'lg:bg-transparent',
    'lg:p-0',
    'lg:opacity-100',
    'lg:shadow-none',
    isToggled
      ? 'visible scale-100 opacity-100 translate-y-0'
      : 'invisible scale-90 opacity-0 translate-y-1',
  ].join(' ');

  const layerClasses = [
    'fixed',
    'inset-0',
    'z-10',
    'h-screen',
    'w-screen',
    'origin-bottom',
    'backdrop-blur-2xl',
    'transition',
    'duration-500',
    'bg-background/70',
    'lg:hidden',
    isToggled ? 'origin-top scale-y-100' : 'scale-y-0',
  ].join(' ');

  const hamburgerLineClasses = [
    'm-auto',
    'h-0.5',
    'w-5',
    'rounded',
    'transition',
    'duration-300',
    'bg-gray-300',
  ].join(' ');

  return (
    <header
      id='header'
      className={headerClasses}
      {...(isLanding ? { 'data-sticky-header': 'true' } : {})}
    >
      <div className={containerClasses}>
        <div className='relative z-20 flex w-full justify-between md:px-0 lg:w-max'>
          <a href='/#home' aria-label='logo' className='flex items-center space-x-2'>
            <div className='h-8 w-8'>
              <JammyIcon className='text-primary h-full w-full' />
            </div>
            <span className='text-2xl font-bold text-white'>Jammy</span>
          </a>

          <div className='relative flex max-h-10 items-center lg:hidden'>
            <button
              aria-label='hamburger'
              id='hamburger'
              className='relative -mr-6 cursor-pointer p-6'
              onClick={toggleNavlinks}
            >
              <div
                aria-hidden='true'
                className={`${hamburgerLineClasses} ${isToggled ? 'translate-y-1.5 rotate-45' : ''}`}
              />
              <div
                aria-hidden='true'
                className={`${hamburgerLineClasses} mt-2 ${isToggled ? '-translate-y-1 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        <div id='navLayer' aria-hidden='true' className={layerClasses} />

        <nav id='navlinks' className={navClasses}>
          <div className='w-full text-gray-200 lg:w-auto lg:pt-0 lg:pr-4'>
            <ul className='flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm'>
              {HEADER_LINKS.map(({ to, label, tag }) => (
                <li key={to}>
                  <a
                    href={to}
                    className='flex items-center gap-2 font-semibold transition hover:text-white md:px-4'
                    onClick={handleLinkClick}
                  >
                    <span>{label}</span>
                    {tag && (
                      <span className='text-primary flex rounded-full bg-white/10 px-1.5 py-0.5 text-xs tracking-wider'>
                        {tag}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-12 lg:mt-0'>
            <HeaderUser />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
