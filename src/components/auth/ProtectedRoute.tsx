import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/stores/auth';
import { Loader2 } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!user && isAuthenticated) {
    return (
      <div className='gradient-bg flex min-h-screen items-center justify-center'>
        <Loader2 className='text-primary-500 h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
