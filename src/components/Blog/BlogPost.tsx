import React from 'react';

import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { TAllPosts } from '../../types/types';

import { blogPost } from '../../controller/controller';

import PostLoader from './PostLoader';

export default function BlogPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
    initialData,
  });

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full flex flex-col">
        <div className="w-full max-w-[1440px] place-self-center py-6">
          {isPending ? (
            <PostLoader />
          ) : (
            !error && (
              <div className="flex flex-col items-center">
                <img
                  className="h-1/2 w-1/2 object-cover flex-1"
                  src={
                    data.data[0].attributes.placeholderThumbnail ??
                    `http://localhost:1337${data.data[0].attributes.thumbnail!.data[0].attributes.url}`
                  }
                />
                <h1>{data.data[0].attributes.title}</h1>
                <p>{data.data[0].attributes.author}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
