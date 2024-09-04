import { Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import VerticalDivider from '../Dividers/VerticalDivider';
import BigPost from './BigPost';
import BigPostLoader from './BigPostLoader';
import { allPosts } from '../../controller/controller';

import logo from '/logo.svg';
import NavBar from './NavBar';
import SideBar from './SideBar';

import { renderComponents } from '../../controller/controller';

export default function Blog() {
  const { isPending, error, data } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: allPosts,
  });

  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full h-36 bg-cover bg-[center_35%] bg-[url('https://images.unsplash.com/photo-1517094857443-80776ddd155c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex justify-center py-8">
        <div className="w-full max-w-[1440px] place-self-center">
          <p className="text-3xl text-black">
            VENTURE <img className="inline" src={logo} /> CAPITAL
          </p>
        </div>
      </div>
      <div className="w-full min-h-screen max-w-[1440px] my-8 mx-auto flex flex-col gap-8">
        <NavBar />
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3 flex flex-col gap-4">
            {isPending && (
              <>
                <BigPostLoader />
                <BigPostLoader />
              </>
            )}
            {!isPending && !error && pathname === '/blog' ? (
              renderComponents(data!.data.slice(0, 2), BigPost)
            ) : (
              <></>
            )}
            {error && <div>Something went wrong. Try again</div>}
          </div>
          <div className="col-span-1 flex gap-4">
            <VerticalDivider />
            <SideBar />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
