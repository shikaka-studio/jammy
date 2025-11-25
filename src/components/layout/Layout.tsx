import Header from './Header';

interface LayoutProps {
  isLanding?: boolean;
  children: React.ReactNode;
}

const Layout = ({ isLanding, children }: LayoutProps) => (
  <main className='bg-background'>
    <Header isLanding={isLanding} />
    <div className='relative'>{children}</div>
  </main>
);

export default Layout;
