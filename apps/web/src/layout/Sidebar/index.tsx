import { useSidebarMode } from '@/hooks/useSidebarMode';
import { SIDEBAR_WIDTH } from '@/settings/enum';
import styles from '@/styles/layout/sidebar.module.less';
import { Iconify } from '@fastest/components';
import { classes } from '@fastest/utils';
import { IconButton, styled } from '@mui/material';
import DefaultMenu from './component/DefaultMenu';

/**
 * 折叠按钮
 */
const IconCollapsed = styled(IconButton)(({ mode = 'expanded' }: { mode: string }) => {
  return {
    position: 'absolute',
    top: 30,
    right: 0,
    transform: `translateX(50%) rotate(${mode === 'expanded' ? '0deg' : '180deg'})`,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: 'transform var(--layout-transition-duration) var(--layout-transition-easing) 100ms',
    zIndex: 1001,
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
  };
});

export default function Sidebar() {
  const { toggle, mode } = useSidebarMode(); // 自动同步响应式宽度

  const width = mode === 'expanded' ? SIDEBAR_WIDTH.expanded : mode === 'collapsed' ? SIDEBAR_WIDTH.collapsed : 0;

  return (
    <div className={styles.sidebar__root}>
      <IconCollapsed
        mode={mode}
        onClick={() => {
          toggle();
        }}
        aria-label="add an alarm"
        className={classes(styles.sidebar_collapsed)}
      >
        <Iconify icon="eva:arrow-ios-forward-fill" className="text-base text-gary-500 cursor-pointer " />
      </IconCollapsed>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__content}>
          <div className={styles.sidebar__content_header}> </div>
          <div className={styles.sidebar__content_body}>
            <DefaultMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
