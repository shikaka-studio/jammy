import { useAuthStore } from '@/stores/auth';
import SpotifyIcon from '@/assets/spotify.svg';

const HeaderUser = () => {
  const { user } = useAuthStore();
  const handleLogin = () => {};
  const handleLogout = () => {};

  return user ? (
    <button
      className='flex items-center gap-3 rounded-full bg-white/10 px-3 py-2'
      onClick={handleLogout}
    >
      <img className='h-5 w-5 rounded-full' src={user.avatar} alt='Rounded avatar' />
      <span className='text-xs font-semibold text-white'>{user.name}</span>
    </button>
  ) : (
    <button
      className='group bg-primary relative inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-2.5 py-1.5 text-sm font-semibold text-gray-900'
      onClick={handleLogin}
    >
      <img src={SpotifyIcon} alt='Spotify' className='h-5 w-5' />
      Sign in to Spotify
      <div className='absolute inset-0 flex h-full w-full transform-[skew(-12deg)_translateX(-100%)] justify-center group-hover:transform-[skew(-12deg)_translateX(100%)] group-hover:duration-1000'>
        <div className='relative h-full w-8 bg-white/20'></div>
      </div>
    </button>
  );
};

export default HeaderUser;
