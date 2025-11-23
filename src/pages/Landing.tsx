import Features from '@/components/landing/Features';
import HeroSection from '@/components/landing/HeroSection';
import Layout from '@/components/layout/Layout';
import Footer from '@/components/layout/Footer';

const Landing = () => (
  <Layout isLanding>
    <main className='space-y-24'>
      <HeroSection />
      <Features />
      <Footer />
    </main>
  </Layout>
);

export default Landing;
