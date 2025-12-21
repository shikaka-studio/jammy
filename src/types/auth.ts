export interface AuthURLResponse {
  auth_url: string;
}

export type AuthCallbackStatus = 'loading' | 'error' | 'success';
