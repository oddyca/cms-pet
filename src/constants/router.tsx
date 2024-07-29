import { createBrowserRouter, Outlet } from 'react-router-dom';

import App from '../App';
import Header from '../components/Header/Header';
import Blog from '../components/Blog/Blog';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
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
