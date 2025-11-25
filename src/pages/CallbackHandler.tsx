import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import BaseLayout from '@/components/layout/BaseLayout';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth';
import type { AuthCallbackStatus } from '@/types/auth';

const CallbackHandler = () => {
  const [status, setStatus] = useState<AuthCallbackStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract code from URL query params
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        // Check for Spotify error (user denied access)
        const spotifyError = params.get('error');

        if (spotifyError) {
          throw new Error('Spotify authorization was denied.');
        }

        // Validate code exists
        if (!code) {
          throw new Error('No authorization code received from Spotify.');
        }

        // Exchange code for token
        const response = await authService.handleCallback(code);

        // Store auth data in Zustand store (also persists to localStorage)
        setUser(response.user, response.token);

        // Show success state briefly before redirect
        setStatus('success');

        // Redirect to dashboard after brief delay
        // Delay allows user to see success message
        setTimeout(() => {
          // TODO: Navigate to rooms page?
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

  const handleRetry = () => {
    // TODO: Login again
  };

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
          <button
            onClick={handleRetry}
            className='bg-primary relative inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-2.5 py-1.5 text-sm font-semibold text-gray-900'
          >
            Try Again
          </button>
        </div>
      </main>
    </BaseLayout>
  );
};

export default CallbackHandler;
