import { ThemeProvider } from '@fastest/components';
import { unmountGlobalLoading } from '@fastest/plugins/unloading';
import { RouterProvider } from '@modern-js/runtime/router';
import { CssBaseline } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import favicon from '@public/images/favicon.ico';
import { SnackbarProvider } from 'notistack';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { StrictMode, useEffect } from 'react';
import { router } from './routes';

import '@/styles/global.less';
import 'overlayscrollbars/overlayscrollbars.css';

/**
 *
 * @constructor
 */
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      unmountGlobalLoading();
    }, 0);
  }, []);

  const theme: ThemeOptions = {};

  return (
    <StrictMode>
      <ThemeProvider>
        {/* <link rel="icon" type="image/x-icon" href={favicon} /> */}
        {/* <link rel="icon" type="image/x-icon" href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico" /> */}
        <SnackbarProvider
          maxSnack={3} // 最多同时显示3条通知
          anchorOrigin={{
            // 通知显示位置
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={1000} // 通知自动隐藏时间
          preventDuplicate // 防止重复通知
          hideIconVariant // 隐藏通知图标
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
