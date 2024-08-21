import { TAllPosts } from '../types/types';

export const allPosts = (): Promise<TAllPosts> => {
  const fetchedData = fetch('http://localhost:1337/api/blog-posts').then(
    (res) => res.json(),
  );

  return fetchedData as Promise<TAllPosts>;
};
