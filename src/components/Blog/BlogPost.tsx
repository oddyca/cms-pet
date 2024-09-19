import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { TAllPosts } from '../../types/types';

import { blogPost, convertDate } from '../../controller/controller';

import PostLoader from './PostLoader';
import Tag from '../Tag/Tag';

export default function BlogPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
    initialData,
  });

  const convertedDate = convertDate(data.data[0].attributes.publishedAt);

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full flex flex-col">
        <div className="w-full max-w-[1440px] place-self-center py-6">
          {/* <BreadCrumbs /> */}
          {isPending ? (
            <PostLoader />
          ) : (
            !error && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <h1 className="text-3xl font-serif font-black">
                    {data.data[0].attributes.title}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <p>by {data.data[0].attributes.author} </p>
                    <p>•</p>
                    <p>{convertedDate}</p>
                    <p>• </p>
                    <Tag tag={data.data[0].attributes.tag} elem={'post'} />
                  </div>
                </div>
                <div className="h-96 w-1/2 rounded-md overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={
                      data.data[0].attributes.placeholderThumbnail ??
                      `http://localhost:1337${data.data[0].attributes.thumbnail!.data[0].attributes.url}`
                    }
                  />
                </div>
                <p className="lg:w-3/4 text-lg">
                  {data.data[0].attributes.content}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
