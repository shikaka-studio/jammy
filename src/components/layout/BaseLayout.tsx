import Header from './Header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => (
  <main className='h-screen w-screen bg-background flex flex-col'>
    <Header />
    <div className='bg-background-content relative flex-1 w-full overflow-auto'>{children}</div>
  </main>
);

export default BaseLayout;
