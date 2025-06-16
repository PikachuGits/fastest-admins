import styles from '@/styles/layout/header.module.less';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderLayout = styled(Box)(({ theme }) => {
  return {
    height: '64px',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 1000,
    paddingLeft: '340px',
  };
});

const HeaderContent = styled(Box)(({ theme }) => {
  return {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    padding: '16px',
  };
});

export default function Header() {
  return (
    <HeaderLayout className={styles.header__root}>
      <HeaderContent>
        <div>123</div>
      </HeaderContent>
    </HeaderLayout>
  );
}
