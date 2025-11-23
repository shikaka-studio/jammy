import Container from '@/ui/Container';
import ColouredBackground from './ColouredBackground';

const HeroSection = () => (
  <div className='relative scroll-mt-20' id='home'>
    <ColouredBackground />
    <Container>
      <div className='relative ml-auto pt-36'>
        <div className='mx-auto text-center lg:w-[70%]'>
          <h1 className='text-4xl font-bold text-white md:text-5xl xl:text-6xl'>
            <span className='text-primary'>Listen</span> and{' '}
            <span className='text-primary'>share</span> music with your friends in real-time.
          </h1>
          <p className='mt-8 text-gray-300'>
            <strong>Jammy</strong> uses the <strong>Spotify</strong> technology to take real-time
            listening with pals to the next level. Whether you're together or apart, joining a jam
            session with your loved ones is now simpler than ever.
          </p>
          <div className='mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4'>
            <a
              href='#'
              className='before:bg-primary relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
            >
              <span className='relative text-base font-semibold text-gray-900'>Get started</span>
            </a>
            <a
              href='#features'
              className='before:bg-primary/10 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-gray-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
            >
              <span className='relative text-base font-semibold text-white'>Learn more</span>
            </a>
          </div>
          <div className='border-background-overlay mt-16 flex flex-col justify-between gap-8 border-y py-8 sm:flex-row'>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>Connect Spotify</h6>
              <p className='mt-2 text-gray-500'>
                No account creation needed. Sign in with your Spotify account to get started.
              </p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>Create or Join Rooms</h6>
              <p className='mt-2 text-gray-500'>
                Start your own room or join a friend's. Share the link to invite others.
              </p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>Vibe together</h6>
              <p className='mt-2 text-gray-500'>
                Add songs, vote on favorites, chat, and enjoy music with your crew.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default HeroSection;
