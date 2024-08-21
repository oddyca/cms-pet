import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import VerticalDivider from '../Dividers/VerticalDivider';
import BigPost from './BigPost';
import { allPosts } from '../../controller/controller';
import { TPost } from '../../types/types';

import logo from '/logo.svg';
import NavBar from './NavBar';

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
            {!isPending && renderBigPosts(data!.data)}
          </div>
          <div className="col-span-1 flex gap-4">
            <VerticalDivider />
            <div className="flex flex-col gap-4">
              <p className="text-gray-400">SEE ALSO</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">
                    5 Essential Skills Every Visionary Must Have
                  </h3>
                  <Link to="/" className="hover:text-link-blue-100">
                    Read more &#10141;
                  </Link>
                  <div className="flex place-self-end items-center gap-2 text-sm">
                    <p>Feb 20, 2024</p>
                    <p>•</p>
                    <NavLink
                      to="/blog/articles"
                      className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100"
                    >
                      Articles
                    </NavLink>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">
                    5 Essential Skills Every Visionary Must Have
                  </h3>
                  <Link to="/" className="hover:text-link-blue-100">
                    Read more &#10141;
                  </Link>
                  <div className="flex place-self-end items-center gap-2 text-sm">
                    <p>Feb 20, 2024</p>
                    <p>•</p>
                    <NavLink
                      to="/blog/our-ideas"
                      className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100"
                    >
                      Ideas
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
