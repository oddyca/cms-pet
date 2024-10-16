import { useQuery } from '@tanstack/react-query';

import PostCard from './PostCard';
import HorizontallDivider from '@/components/Dividers/HorizontalDivider';
import Dropwdown from '@/components/Dropdown/Dropwdown';

import { allPosts, renderComponents } from '@/controller/controller';

import { TAllPosts } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/controller/store/store';

export default function Posts() {
  const category = useSelector(
    (state: RootState) => state.dashboardCategoryFilter.value,
  );

  const allPostsQuery = useQuery<TAllPosts>({
    queryKey: ['blogPosts'],
    queryFn: allPosts,
    enabled: category === 'All Categories',
  });

  const categoriesFilterQuery = useQuery({
    queryKey: ['category', category],
    queryFn: async () => {
      const fetchedData = await fetch(
        `http://localhost:1337/api/blog-posts?filters[tag][$eqi]=${category}&populate=thumbnail`,
      );

      return fetchedData.json();
    },
    enabled: category !== 'All Categories',
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
        {category !== 'All Categories' ? (
          categoriesFilterQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            renderComponents(categoriesFilterQuery.data!.data, PostCard)
          )
        ) : allPostsQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          renderComponents(allPostsQuery.data!.data, PostCard)
        )}
      </div>
    </div>
  );
}
