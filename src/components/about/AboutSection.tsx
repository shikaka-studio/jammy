import Container from '@/ui/Container';

const AboutSection = () => (
  <div className='relative pt-24' id='about'>
    <Container>
      <div className='mx-auto lg:w-[80%]'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white md:text-5xl'>
            About <span className='text-primary'>Jammy</span>
          </h1>
          <p className='mt-8 text-lg text-gray-300'>
            Bringing people together through the power of music
          </p>
        </div>

        <div className='mt-16 space-y-12 text-gray-300'>
          <div className='bg-background-elevated rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-white'>Our Mission</h2>
            <p className='mt-4 leading-relaxed'>
              Jammy was created to solve a simple problem: listening to music together shouldn't be
              complicated. Whether you're in the same room or miles apart, we believe music is
              better when shared with friends.
            </p>
          </div>

          <div className='bg-background-elevated rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-white'>How It Works</h2>
            <p className='mt-4 leading-relaxed'>
              Built on Spotify's powerful technology, Jammy creates synchronized listening rooms
              where everyone hears the same track at the same moment. Create a room, share the link,
              and start jamming together. Vote on songs, chat about the music, and discover new
              tracks with your crew.
            </p>
          </div>

          <div className='bg-background-elevated rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-white'>Why Jammy?</h2>
            <div className='mt-4 space-y-4'>
              <div className='flex items-start gap-3'>
                <span className='text-primary mt-1 text-xl'>•</span>
                <p className='leading-relaxed'>
                  <strong className='text-white'>No Hassle Setup:</strong> Just connect your Spotify
                  account and you're ready to go
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-primary mt-1 text-xl'>•</span>
                <p className='leading-relaxed'>
                  <strong className='text-white'>Perfect Synchronization:</strong> Everyone stays in
                  sync, no matter where they are
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-primary mt-1 text-xl'>•</span>
                <p className='leading-relaxed'>
                  <strong className='text-white'>Democratic Playlists:</strong> Let everyone have a
                  say in what plays next
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-primary mt-1 text-xl'>•</span>
                <p className='leading-relaxed'>
                  <strong className='text-white'>Social Experience:</strong> Chat, react, and vibe
                  together in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default AboutSection;
