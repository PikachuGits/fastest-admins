import { useSidebarStore } from '@/stores/useSidebarStore';
import { type Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
/**
 * hooks/useSidebarMode.ts
 * 侧边栏模式
 * @returns
 */
export function useSidebarMode() {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('md', 'lg'));
  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const setResponsiveMode = useSidebarStore(s => s.setResponsiveMode);
  const setMode = useSidebarStore(s => s.setMode);

  useEffect(() => {
    const mode = isDesktop ? 'expanded' : isTablet ? 'collapsed' : 'hidden';
    setResponsiveMode(mode);
    setMode(mode); // 默认也跟着响应式变化
  }, [isDesktop, isTablet, setResponsiveMode, setMode]);

  const toggle = useSidebarStore(s => s.toggle);
  const mode = useSidebarStore(s => s.mode);

  return { toggle, mode };
}
