import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';

import PostCard from './PostCard/PostCard';
import Dropwdown from '@/components/Dropdown/Dropdown';

import { getAllPosts, getAllDrafts } from '@/services/fetchServices';
import { renderComponents } from '@/services/renderServices';

import { TAllPosts } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store/store';
import { setCategory } from '@/state/store/slices/categorySelectionSlice';
import { Link } from 'react-router-dom';

export default function Posts() {
  const { slug } = useParams();
  const allCategoriesArr = useRef<string[]>([]);

  const category =
    useSelector((state: RootState) => state.dashboardCategoryFilter.value) ||
    'All Categories';

  const allPostsQuery = useQuery<TAllPosts>({
    queryKey: ['blogPosts'],
    queryFn: getAllPosts,
    enabled: category === 'All Categories',
  });

  const allDraftsQuery = useQuery<TAllPosts>({
    queryKey: ['blogDrafts'],
    queryFn: getAllDrafts,
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

  if (!allPostsQuery.isPending) {
    const categoriesSet = new Set<string>();

    allPostsQuery.data!.data.map((post) => {
      const capFirstLetter =
        post.attributes.tag.charAt(0).toUpperCase() +
        post.attributes.tag.slice(1);

      categoriesSet.add(capFirstLetter);
    });

    allCategoriesArr.current = ['All Categories', ...categoriesSet];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCategory(''));
    };
  }, []);

  if (slug) return <Outlet />;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full p-2 flex justify-between">
        <div>
          <Dropwdown
            menuOptions={allCategoriesArr.current}
            defaultCat="All Categories"
          />
        </div>
        <Link
          to="/dashboard/posts/create-new"
          className="rounded-md bg-link-blue-300 px-2 py-1 text-white font-bold hover:text-white hover:bg-link-blue-100"
        >
          CREATE NEW POST
        </Link>
      </div>
      <div className="h-full flex min-h-0">
        <div className="basis-1/2 custom-scrollbar-hidden hover:custom-scrollbar overflow-y-auto p-2">
          <p>Published posts</p>
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
        <div className="basis-1/2 custom-scrollbar-hidden hover:custom-scrollbar overflow-y-auto p-2">
          <p>Drafts</p>
          {allDraftsQuery.isLoading ? (
            <p>Loading...</p>
          ) : allDraftsQuery.data!.data.length === 0 ? (
            <div className="h-[calc(100%-1.5rem)] flex items-center justify-center italic">
              No drafts found
            </div>
          ) : (
            renderComponents(allDraftsQuery.data!.data, PostCard)
          )}
        </div>
      </div>
    </div>
  );
}
