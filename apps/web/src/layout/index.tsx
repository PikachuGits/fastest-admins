import styles from '@/styles/layout/index.module.less';
import { Outlet } from '@modern-js/runtime/router';
import { Box, styled } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const ContainerLayout = styled(Box)(({ theme }) => {
  return {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    padding: '80px 40px 64px 340px',
  };
});

export default function Root() {
  return (
    <Box className={styles.layout__root}>
      {/* 头部 */}
      <Header />
      {/* 侧边栏 */}
      <Sidebar />
      {/* 内容 */}
      <ContainerLayout>
        <Outlet />
      </ContainerLayout>
    </Box>
  );
}
