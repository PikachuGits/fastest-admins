// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  username: string;
  nickname?: string;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  userInfo: UserInfo | null;
  roles: string[];
  menus: any[]; // 可以根据项目类型定义 Route 类型

  setToken: (token: string) => void;
  setUserInfo: (user: UserInfo) => void;
  setRoles: (roles: string[]) => void;
  setMenus: (menus: any[]) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      userInfo: null,
      roles: [],
      menus: [],

      setToken: token => set({ token }),
      setUserInfo: user => set({ userInfo: user }),
      setRoles: roles => set({ roles }),
      setMenus: menus => set({ menus }),

      resetAuth: () =>
        set({
          token: null,
          userInfo: null,
          roles: [],
          menus: [],
        }),
    }),
    {
      name: 'auth-store', // localStorage key
      partialize: state => ({
        token: state.token,
        userInfo: state.userInfo,
        roles: state.roles,
        menus: state.menus,
      }),
    },
  ),
);
