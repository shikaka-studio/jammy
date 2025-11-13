interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => (
  <div className='mx-auto max-w-7xl px-6 md:px-12 xl:px-6'>{children}</div>
);

export default Container;
