import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { filterByCategory } from '../controller/controller';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import App from '../App';
import Header from '../components/Header/Header';
import Blog from '../components/Blog/Blog';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Dashboard from '../components/Dashboard/Dashboard';
import BlogPost from '../components/Blog/BlogPost';
import Category from '../components/Blog/Category';

const queryClient = new QueryClient();

export const Layout = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </QueryClientProvider>
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
        children: [
          {
            path: ':category',
            element: <Category />,
            loader: filterByCategory,
          },
        ],
      },
      {
        path: '/blog/:category/:slug',
        element: <BlogPost />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
