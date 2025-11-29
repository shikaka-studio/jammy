import type { User } from './user';

export interface AuthURLResponse {
  auth_url: string;
}

export interface AuthCallbackResponse {
  token: string;
  user: User;
}

export type AuthCallbackStatus = 'loading' | 'error' | 'success';
