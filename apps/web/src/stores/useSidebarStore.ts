// hooks/useSidebarStore.ts
import { create } from 'zustand';

export type SidebarMode = 'expanded' | 'collapsed' | 'hidden';

interface SidebarState {
  mode: SidebarMode;
  responsiveMode: SidebarMode;

  setMode: (mode: SidebarMode) => void;
  setResponsiveMode: (mode: SidebarMode) => void;

  toggle: () => void;
  collapse: () => void;
  expand: () => void;
  hide: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  mode: 'expanded',
  responsiveMode: 'expanded',

  setMode: mode => set({ mode }),
  setResponsiveMode: mode => set({ responsiveMode: mode }),

  toggle: () =>
    set(state => ({
      mode: state.mode === 'expanded' ? 'collapsed' : 'expanded',
    })),

  collapse: () => set({ mode: 'collapsed' }),
  expand: () => set({ mode: 'expanded' }),
  hide: () => set({ mode: 'hidden' }),
}));
