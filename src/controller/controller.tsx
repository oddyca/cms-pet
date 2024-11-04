import React from 'react';
import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { TAllPosts, TPost, TCategoryPosts, TUpdateEntry } from '@/types/types';
import { LoaderFunction } from 'react-router-dom';

export const blogLoader = async (queryClient: QueryClient) => {
  const queryKey = ['blogPosts'];

  return defer({
    blogPosts: queryClient.ensureQueryData({
      queryKey,
      queryFn: allPosts,
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
        queryFn: () => blogPost(slug),
      }))
    );
  };

export const allPosts = async (): Promise<TAllPosts> => {
  const fetchedData = await fetch(
    'http://localhost:1337/api/blog-posts?populate=thumbnail',
  );
  return fetchedData.json();
};

export const categoryPosts = async (
  category: string,
): Promise<TCategoryPosts> => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${category}&populate=thumbnail`,
  ).then((res) => res.json());

  return fetchedData as Promise<TCategoryPosts>;
};

export const filterByCategory: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${params.category}&populate=thumbnail`,
    { signal: request.signal },
  ).then((res) => res.json());

  return fetchedData as TAllPosts;
};

export const blogPost = async (slug: string): Promise<TAllPosts> => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[slug][$eqi]=${slug}&populate=thumbnail`,
  ).then((res) => res.json());

  return fetchedData as Promise<TAllPosts>;
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

export const signIn = async (email: string, password: string) => {
  const response = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  });
  return response;
};

export const updateViews = async (entryID: number) => {
  try {
    const response = await fetch(
      `http://localhost:1337/api/blog-posts/${entryID}/increment-view`,
      {
        method: 'PUT',
      },
    );

    if (!response.ok) {
      console.error('Failed to increment view count');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateEntry = async ({ entryID, entryData }: TUpdateEntry) => {
  const url = `http://localhost:1337/api/blog-posts/${entryID}`;
  const updatedData = {
    data: { ...entryData },
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData);
    }

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};
