import { useNavigate } from 'react-router';
import Button from '@/ui/Button';
import Link from '@/ui/Link';
import SpotifyIcon from '@/icons/SpotifyIcon';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

const HeaderUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return user ? (
    <Button
      className='flex cursor-pointer items-center gap-3 rounded-full bg-white/10 px-3 py-2'
      onClick={handleLogout}
    >
      <img className='h-5 w-5 rounded-full' src={user.profile_image_url} alt='Rounded avatar' />
      <span className='text-xs font-semibold text-white'>{user.display_name}</span>
    </Button>
  ) : (
    <Link
      href={`${API_URL}/auth/login`}
      className='group bg-primary relative inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-2.5 py-1.5 text-sm font-semibold text-gray-900'
    >
      <SpotifyIcon className='w-5' />
      Sign in to Spotify
      <div className='absolute inset-0 flex h-full w-full transform-[skew(-12deg)_translateX(-100%)] justify-center group-hover:transform-[skew(-12deg)_translateX(100%)] group-hover:duration-1000'>
        <div className='relative h-full w-8 bg-white/20'></div>
      </div>
    </Link>
  );
};

export default HeaderUser;
