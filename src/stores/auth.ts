import { create } from 'zustand';
import type { User } from '@/types/user';
import { getToken, setToken, getUserData, setUserData, clearAuth } from '@/utils/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: getUserData() as User | null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,

  setUser: (user: User, token: string) => {
    setToken(token);
    setUserData(user);
    set({
      user,
      token,
      isAuthenticated: true,
      error: null,
    });
  },

  logout: () => {
    clearAuth();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = getToken();
    const user = getUserData() as User | null;

    if (!token || !user) {
      set({ user: null, token: null, isAuthenticated: true });
      return;
    }

    set({ user, token, isAuthenticated: false });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
