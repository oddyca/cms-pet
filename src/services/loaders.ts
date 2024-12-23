import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { getAllPosts, getBlogPost, filterByCategory } from './fetchServices';

export const blogLoader = async (queryClient: QueryClient) => {
  const queryKey = ['blogPosts'];

  return defer({
    blogPosts: queryClient.ensureQueryData({
      queryKey,
      queryFn: getAllPosts,
    }),
  });
};

export const categoryLoader =
  (queryClient: QueryClient) => async (args: LoaderFunctionArgs) => {
    const queryKey = ['category', args.params.category];

    return (
      queryClient.getQueryData(queryKey) ??
      (await queryClient.fetchQuery({
        queryKey,
        queryFn: () => filterByCategory(args),
      }))
    );
  };

export const blogPostLoader =
  (queryClient: QueryClient) => async (args: LoaderFunctionArgs) => {
    const queryKey = ['post', args.params.slug];
    const slug = args.params.slug as string;

    return (
      queryClient.getQueryData(queryKey) ??
      (await queryClient.fetchQuery({
        queryKey,
        queryFn: () => getBlogPost(slug),
      }))
    );
  };
