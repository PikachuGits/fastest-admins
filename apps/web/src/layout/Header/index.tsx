import styles from '@/styles/layout/header.module.less';
import { Iconify } from '@fastest/components';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderLayout = styled(Box)(({ theme }) => {
  return {
    height: '64px',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 1000,
  };
});

const HeaderContent = styled(Box)(({ theme }) => {
  return {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px 0 330px',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };
});

const IconButtonBox = styled(IconButton)(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      scale: 1.05,
    },
  };
});

const RotatingBorderAvatar = () => {
  return (
    <IconButtonBox className="relative w-10 h-10">
      {/* 旋转的边框 SVG */}
      <svg width="100%" height="100%" viewBox="0 0 120 120" className="animate-spin-slow absolute top-0 left-0">
        <title id="svgTitle">Avatar</title>
        <defs>
          <mask id="hole-mask">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="60" cy="60" r="48" fill="black" />
          </mask>
        </defs>
        {/* 外圈边框 */}
        <circle cx="60" cy="60" r="58" stroke="url(#gradient)" strokeWidth="4" fill="none" mask="url(#hole-mask)" />
        {/* 渐变色定义 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#5762fe" />
          </linearGradient>
        </defs>
      </svg>

      {/* 头像层 */}
      <Avatar
        className="w-full h-full absolute left-0 top-0 border-[4px] border-transparent"
        src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp"
      />
    </IconButtonBox>
  );
};

export default function Header() {
  return (
    <HeaderLayout className={styles.header__root}>
      <HeaderContent>
        <Box className="flex items-center gap-2">
          <Button size="small" variant="text">
            门店地址
          </Button>
        </Box>
        <Box className="flex items-center gap-2 px-6">
          <IconButtonBox>
            <Iconify icon="solar:full-screen-square-outline" className="text-inherit text-gary-500 cursor-pointer" />
          </IconButtonBox>
          <IconButtonBox>
            <Iconify icon="solar:bell-bing-bold-duotone" className="text-inherit text-gary-500 cursor-pointer" />
          </IconButtonBox>
          <IconButtonBox>
            <Iconify icon="solar:settings-bold-duotone" className="text-inherit text-gary-500 cursor-pointer animate-spin-slow rounded-full" />
          </IconButtonBox>
          <RotatingBorderAvatar />
        </Box>
      </HeaderContent>
    </HeaderLayout>
  );
}
