import { create } from 'zustand';

type AuthState = {
  user: any;
  token: string | null;
  setAuth: (data: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  setAuth: (data) => {
    const token = data?.accessToken;
    localStorage.setItem('token', token);

    set({
      user: data,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
