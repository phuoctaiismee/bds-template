'use client';
import { ITekgetherApiUser } from '@/apis/yaah/interfaces/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  user: ITekgetherApiUser | null;
}

interface Actions {
  setUser: (user: ITekgetherApiUser | null) => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: ITekgetherApiUser | null) => set({ user }),
    }),
    {
      name: 'store/auth',
      version: 1,
    },
  ),
);
