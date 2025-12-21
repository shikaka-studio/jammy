import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import Link from '@/ui/Link';
import BaseLayout from '@/components/layout/BaseLayout';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth';
import { ROUTES } from '@/constants/routes';
import { API_URL } from '@/constants/api';
import type { AuthCallbackStatus } from '@/types/auth';

const CallbackHandler = () => {
  const [status, setStatus] = useState<AuthCallbackStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract code from URL query params
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        // Validate code exists
        if (!token) {
          throw new Error('No authorization code received from Spotify.');
        }

        setToken(token);

        // Exchange code for token
        const response = await authService.getCurrentUser();

        // Store auth data in Zustand store (also persists to localStorage)
        setUser(response);

        // Show success state briefly before redirect
        setStatus('success');

        // Redirect to dashboard after brief delay
        // Delay allows user to see success message
        setTimeout(() => {
          navigate(ROUTES.ROOMS);
        }, 1000);
      } catch (err) {
        console.error('Callback failed:', err);
        setStatus('error');
        setError(
          err instanceof Error ? err.message : 'Failed to complete login. Please try again.'
        );
      }
    };

    handleCallback();
  }, []);

  // Loading state
  if (status === 'loading') {
    return (
      <BaseLayout>
        <main className='flex h-full items-center justify-center'>
          <div className='card max-w-md text-center'>
            <Loader2 className='text-primary mx-auto mb-4 h-12 w-12 animate-spin' />
            <h2 className='mb-3 text-2xl font-bold'>Completing Login...</h2>
            <p className='text-dark-400'>Please wait while we connect your Spotify account.</p>
          </div>
        </main>
      </BaseLayout>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <BaseLayout>
        <main className='flex h-full items-center justify-center'>
          <div className='card max-w-md text-center'>
            <div className='bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
              <Check className='text-primary h-6 w-6' />
            </div>
            <h2 className='mb-3 text-2xl font-bold'>Login Successful!</h2>
            <p className='text-dark-400'>Redirecting to rooms...</p>
          </div>
        </main>
      </BaseLayout>
    );
  }

  // Error state
  return (
    <BaseLayout>
      <main className='flex h-full items-center justify-center'>
        <div className='card max-w-md text-center'>
          <AlertCircle className='text-primary mx-auto mb-4 h-12 w-12' />
          <h2 className='mb-3 text-2xl font-bold'>Login Failed</h2>
          <p className='text-dark-400 mb-6'>{error}</p>
          <Link
            href={`${API_URL}/auth/login`}
            className='bg-primary relative inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-2.5 py-1.5 text-sm font-semibold text-gray-900'
          >
            Try again
          </Link>
        </div>
      </main>
    </BaseLayout>
  );
};

export default CallbackHandler;
