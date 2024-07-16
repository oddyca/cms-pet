import { createBrowserRouter, Outlet } from 'react-router-dom';

import App from '../App';
import Header from '../components/Header/Header';
import Blog from '../components/Blog/Blog';
import Contact from '../components/Contact/Contact';

export const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
]);
