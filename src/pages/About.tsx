import AboutSection from '@/components/about/AboutSection';
import BaseLayout from '@/components/layout/BaseLayout';
import Footer from '@/components/layout/Footer';

const About = () => (
  <BaseLayout>
    <main className='space-y-24'>
      <AboutSection />
      <Footer />
    </main>
  </BaseLayout>
);

export default About;
