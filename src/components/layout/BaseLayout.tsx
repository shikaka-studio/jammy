import Header from './Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => (
  <main className='bg-background'>
    <Header />
    <div className='bg-background-content relative h-full w-full'>{children}</div>
  </main>
);

export default BaseLayout;
