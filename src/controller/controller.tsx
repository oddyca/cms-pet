import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { TAllPosts, TPost, TCategoryPosts } from '../types/types';
import { LoaderFunction } from 'react-router-dom';

// TODO
// write laoders for <Blog /> and each Post
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

export const allPosts = (): Promise<TAllPosts> => {
  const fetchedData = fetch(
    'http://localhost:1337/api/blog-posts?populate=thumbnail',
  ).then((res) => res.json());

  return fetchedData as Promise<TAllPosts>;
};

export const categoryPosts = async (
  category: string,
): Promise<TCategoryPosts> => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${category}`,
  ).then((res) => res.json());

  return fetchedData as Promise<TCategoryPosts>;
};

export const filterByCategory: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${params.category}`,
    { signal: request.signal },
  ).then((res) => res.json());

  return fetchedData as TAllPosts;
};

export const renderComponents = (
  data: TPost[],
  Component: React.ComponentType<TPost['attributes']>,
): React.ReactElement[] => {
  return data.map((post) => {
    const { attributes } = post;
    return <Component key={post.id} {...attributes} />;
  });
};

export const convertDate = (d: string): string => {
  const postDate = new Date(d);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = postDate.toLocaleDateString('en-US', options);

  return formattedDate;
};
