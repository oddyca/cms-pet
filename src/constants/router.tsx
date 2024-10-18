import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  categoryLoader,
  blogLoader,
  blogPostLoader,
} from '@/controller/controller';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/' && pathname.endsWith('/')) {
      navigate(pathname.slice(0, -1), { replace: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

import App from '@/App';
import Header from '@/components/Header/Header';
import Blog from '@/components/Blog/Blog';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Dashboard from '@/components/Dashboard/Dashboard';
import BlogPost from '@/components/Blog/BlogPost';
import Category from '@/components/Blog/Category';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Signin from '@/components/Dashboard/Signin';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import DashboardTab from '@/components/Dashboard/DashboardTab';
import DashboardPost from '@/components/Dashboard/Tabs/Posts/DashboardPost/DashboardPost';

const queryClient = new QueryClient();

export const Layout = () => (
  <>
    <Header />
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    <ScrollToTop />
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
        loader: () => blogLoader(queryClient),
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: ':category',
            element: <Category />,
            loader: categoryLoader(queryClient),
          },
        ],
      },
      {
        path: '/blog/:category/:slug',
        element: <BlogPost />,
        loader: blogPostLoader(queryClient),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Dashboard />,
            children: [
              {
                path: '/dashboard/:tab',
                element: <DashboardTab />,
              },
              {
                path: '/dashboard/posts/:slug',
                element: <DashboardPost />,
                loader: blogPostLoader(queryClient),
              },
            ],
          },
        ],
      },
      {
        path: '/dashboard/signin',
        element: <Signin />,
      },
    ],
  },
]);
