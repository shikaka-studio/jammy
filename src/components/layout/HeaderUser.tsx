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
      className='bg-primary flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-gray-900 transition duration-300 hover:scale-105 active:scale-95 active:duration-75'
      onClick={handleLogin}
    >
      <img src={SpotifyIcon} alt='Spotify' className='h-5 w-5' />
      Sign in to Spotify
    </button>
  );
};

export default HeaderUser;
