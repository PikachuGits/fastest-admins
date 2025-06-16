import Root from '@/layout';
import Dashboard from '@/pages/Dashboard';
import Error404 from '@/pages/Error/404';
import { createBrowserRouter } from '@modern-js/runtime/router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/404',
    element: <Error404 />,
  },
]);
