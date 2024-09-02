import React from 'react';
import { TAllPosts, TFilterCategoryParams, TPost } from '../types/types';
import { LoaderFunction } from 'react-router-dom';

export const allPosts = (): Promise<TAllPosts> => {
  const fetchedData = fetch('http://localhost:1337/api/blog-posts').then(
    (res) => res.json(),
  );

  return fetchedData as Promise<TAllPosts>;
};

export const filterByCategory: LoaderFunction = async ({
  request,
  params,
}: TFilterCategoryParams) => {
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
