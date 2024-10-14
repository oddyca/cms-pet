import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import PostCard from './PostCard';
import HorizontallDivider from '@/components/Dividers/HorizontalDivider';
import Dropwdown from '@/components/Dropdown/Dropwdown';

import { allPosts, renderComponents } from '@/controller/controller';

import { TAllPosts } from '@/types/types';

export default function Posts() {
  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['blogPosts'],
    queryFn: allPosts,
  });

  const [postsToShow, setPostsToShow] = useState([]);

  const categoriesFilterQuery = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const fetchedData = await fetch(
        `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${categoryFilter ?? ''}&populate=thumbnail`,
      );

      return fetchedData;
    },
  });

  return (
    <div className="flex flex-col px-4 p-4 gap-4">
      <div className="w-full h-12 flex flex-col justify-end">
        <HorizontallDivider />
      </div>
      <div className="w-full p-2 flex justify-between">
        <div>
          <Dropwdown
            menuOptions={['All Categories', 'Ideas', 'Mentions', 'Articles']}
          />
        </div>
        <button className="rounded border border-black px-2">
          CREATE NEW POST
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {!isPending ? (
          postsToShow.length != 0 ? (
            renderComponents(postsToShow, PostCard)
          ) : (
            renderComponents(data!.data, PostCard)
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
