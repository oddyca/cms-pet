import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';

import PostCard from './PostCard/PostCard';
import Dropwdown from '@/components/Dropdown/Dropwdown';

import { allPosts, renderComponents } from '@/controller/controller';

import { TAllPosts } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/controller/store/store';

export default function Posts() {
  const { slug } = useParams();

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

  if (slug) return <Outlet />;

  return (
    <div className="flex flex-col">
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
      <div className="h-full flex min-h-0">
        <div className="basis-1/2 custom-scrollbar-hidden hover:custom-scrollbar overflow-y-auto p-2">
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
    </div>
  );
}
