import Root from '@/layout';
import Dashboard from '@/pages/Dashboard';
import Error404 from '@/pages/Error/404';
import { createBrowserRouter } from '@modern-js/runtime/router';
import About from '@/pages/About';

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
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/404',
    element: <Error404 />,
  },
]);
