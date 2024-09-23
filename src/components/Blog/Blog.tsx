import { Suspense } from 'react';
import { Outlet, useLoaderData, useLocation, Await } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import logo from '/logo.svg';

import { allPosts, renderComponents } from '../../controller/controller';

import { TAllPosts } from '../../types/types';

import VerticalDivider from '../Dividers/VerticalDivider';
import BigPost from './BigPost';
import PostCard from './PostCard';
import BigPostLoader from './Loaders/BigPostLoader';
import SideBarLoader from './Loaders/SideBarLoader';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function Blog() {
  const { pathname } = useLocation();
  const initialData = useLoaderData() as TAllPosts;

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['blogPosts'],
    queryFn: allPosts,
    initialData,
  });

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full h-36 bg-cover bg-[center_35%] bg-[url('https://images.unsplash.com/photo-1517094857443-80776ddd155c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex justify-center py-8">
        <div className="w-full max-w-[1440px] place-self-center">
          <p className="text-3xl text-black pointer-events-none">
            VENTURE <img className="inline" src={logo} /> CAPITAL
          </p>
        </div>
      </div>
      <div className="w-full min-h-screen max-w-[1440px] my-8 mx-auto flex flex-col gap-8">
        <NavBar /*postsData={data}*/ />
        <div className="grid grid-cols-4 gap-6">
          {pathname === '/blog' ? (
            <div className="col-span-3 flex flex-col gap-4">
              <Suspense fallback={<BigPostLoader />}>
                <Await resolve={initialData.blogPosts}>
                  {(data) => renderComponents(data.data.slice(0, 2), BigPost)}
                </Await>
              </Suspense>
            </div>
          ) : (
            <div className="col-span-3 flex flex-col gap-4">
              <Outlet />
            </div>
          )}
          <div className="col-span-1 flex gap-4">
            <VerticalDivider />
            <Suspense fallback={<SideBarLoader />}>
              <Await resolve={initialData.blogPosts}>
                {(resolvedData) => <SideBar initialData={resolvedData} />}
              </Await>
            </Suspense>
          </div>
          {pathname === '/blog' && (
            <div className="grid grid-cols-4 col-span-4 gap-4">
              {!isPending &&
                !error &&
                renderComponents(data!.data.slice(2), PostCard)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
