import styles from '@/styles/layout/header.module.less';
import { Iconify } from '@fastest/components';
import { Box, Button, IconButton } from '@mui/material';
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
  };
});

const IconButtonBox = styled(IconButton)(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      scale: 1.05,
    },
  };
});

export default function Header() {
  return (
    <HeaderLayout className={styles.header__root}>
      <HeaderContent>
        <Box className="flex items-center gap-2 border-2 border-red-500">
          <IconButtonBox>
            <Iconify icon="solar:full-screen-square-outline" className="text-inherit text-gary-500 cursor-pointer" />
          </IconButtonBox>
          <IconButtonBox>
            <Iconify icon="solar:bell-bing-bold-duotone" className="text-inherit text-gary-500 cursor-pointer" />
          </IconButtonBox>
          <IconButtonBox>
            <Iconify icon="solar:settings-bold-duotone" className="text-inherit text-gary-500 cursor-pointer animate-spin-slow rounded-full" />
          </IconButtonBox>
        </Box>
      </HeaderContent>
    </HeaderLayout>
  );
}
