import React from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import VerticalDivider from '../Dividers/VerticalDivider';
import BigPost from './BigPost';
import BigPostLoader from './BigPostLoader';
import { allPosts } from '../../controller/controller';
import { TPost } from '../../types/types';

import logo from '/logo.svg';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function Blog() {
  const { isPending, error, data } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: allPosts,
  });

  const renderBigPosts = (d: TPost[]): React.ReactElement[] => {
    return d.map((post: TPost) => (
      <BigPost
        key={post.id}
        title={post.attributes.title}
        content={post.attributes.content}
        author={post.attributes.author}
        tag={post.attributes.tag}
        date={post.attributes.publishedAt}
        thumbnail={post.attributes.placeholderThumbnail}
      />
    ));
  };

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full h-fit bg-sky-500/100 flex justify-center py-8">
        <div className="w-full max-w-[1440px]">
          <p className="text-3xl text-black">
            VENTURE <img className="inline" src={logo} /> CAPITAL
          </p>
        </div>
        {/* <img src={bg} /> */}
      </div>
      <div className="w-full min-h-screen max-w-[1440px] my-8 mx-auto flex flex-col gap-8">
        <NavBar />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-4">
            {isPending && (
              <>
                <BigPostLoader />
                <BigPostLoader />
              </>
            )}
            {!isPending && !error && renderBigPosts(data!.data.slice(0, 1))}
            {error && <div>Something went wrong. Try again</div>}
          </div>
          <div className="col-span-1 flex gap-4">
            <VerticalDivider />
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
