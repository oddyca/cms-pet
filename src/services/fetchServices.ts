import { LoaderFunctionArgs, LoaderFunction } from 'react-router-dom';
import { TAllPosts, TCategoryPosts } from '@/types/types';

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
