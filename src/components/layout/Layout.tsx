import Header from './Header';

interface LayoutProps {
  isLanding?: boolean;
  children: React.ReactNode;
}

const Layout = ({ isLanding, children }: LayoutProps) => (
  <main className='flex min-h-screen flex-col bg-background'>
    <Header isLanding={isLanding} />
    <div className='relative flex-1'>{children}</div>
  </main>
);

export default Layout;
