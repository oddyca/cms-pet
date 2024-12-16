import { LoaderFunctionArgs, LoaderFunction } from 'react-router-dom';
import { TAllPosts, TCategoryPosts } from '@/types/types';

export const getAllPosts = async (): Promise<TAllPosts> => {
  const fetchedData = await fetch(
    'http://localhost:1337/api/blog-posts?populate=thumbnail',
  );
  return fetchedData.json();
};

export const getCategoryPosts = async (
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

export const getBlogPost = async (slug: string): Promise<TAllPosts> => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?filters[slug][$eqi]=${slug}&populate=thumbnail`,
  ).then((res) => res.json());

  return fetchedData as Promise<TAllPosts>;
};

export const getAllTags = async () => {
  try {
    const fetchedData = await fetch(
      'http://localhost:1337/api/blog-posts?fields=tag',
    );
    const allCategories = await fetchedData.json();
    return allCategories;
  } catch (e) {
    console.error(e);
  }
};

export const getStatsForDashboard = async () => {
  try {
    const fetchedData = await fetch(
      'http://localhost:1337/api/blog-posts?fields[0]=title&fields[1]=views&fields[2]=slug&fields[3]=author&fields[4]=tag&fields[5]=createdAt',
    );
    const allViews = await fetchedData.json();
    return allViews;
  } catch (e) {
    console.error(e);
  }
};

export const getAllDrafts = async () => {
  const fetchedData = await fetch(
    `http://localhost:1337/api/blog-posts?publicationState=preview&filters[publishedAt][$null]=true&populate=thumbnail`,
  ).then((res) => res.json());

  return fetchedData as Promise<TCategoryPosts>;
};
