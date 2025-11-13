import Container from '@/shared/Container';
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
              <span className='relative text-base font-semibold text-white'>Get started</span>
            </a>
            <a
              href='#'
              className='before:bg-primary/10 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-gray-700 before:bg-gray-800 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
            >
              <span className='relative text-base font-semibold text-white'>Learn more</span>
            </a>
          </div>
          <div className='mt-16 hidden justify-between border-y border-gray-800 py-8 sm:flex'>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>The lowest price</h6>
              <p className='mt-2 text-gray-500'>Some text here</p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>The fastest on the market</h6>
              <p className='mt-2 text-gray-500'>Some text here</p>
            </div>
            <div className='text-left'>
              <h6 className='text-lg font-semibold text-white'>The most loved</h6>
              <p className='mt-2 text-gray-500'>Some text here</p>
            </div>
          </div>
        </div>
        <div className='mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6'>
          <div className='p-4 grayscale transition duration-200 hover:grayscale-0'>
            <img
              src='images/clients/microsoft.svg'
              className='mx-auto h-12 w-auto'
              loading='lazy'
              alt='client logo'
              width=''
              height=''
            />
          </div>
          <div className='p-4 grayscale transition duration-200 hover:grayscale-0'>
            <img
              src='images/clients/airbnb.svg'
              className='mx-auto h-12 w-auto'
              loading='lazy'
              alt='client logo'
              width=''
              height=''
            />
          </div>
          <div className='flex p-4 grayscale transition duration-200 hover:grayscale-0'>
            <img
              src='images/clients/google.svg'
              className='m-auto h-9 w-auto'
              loading='lazy'
              alt='client logo'
              width=''
              height=''
            />
          </div>
          <div className='flex p-4 grayscale transition duration-200 hover:grayscale-0'>
            <img
              src='images/clients/netflix.svg'
              className='m-auto h-8 w-auto'
              loading='lazy'
              alt='client logo'
              width=''
              height=''
            />
          </div>
          <div className='p-4 grayscale transition duration-200 hover:grayscale-0'>
            <img
              src='images/clients/google-cloud.svg'
              className='mx-auto h-12 w-auto'
              loading='lazy'
              alt='client logo'
              width=''
              height=''
            />
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default HeroSection;
