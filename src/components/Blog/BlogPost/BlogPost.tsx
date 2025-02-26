import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';

import { TAllPosts } from '@/types/types';

import { getBlogPost } from '@/services/fetchServices';
import { convertDate } from '@/utils/dateUtils';
import { updateViews } from '@/services/updateServices';

import PostLoader from '../Loaders/PostLoader';
import Tag from '../../Tag/Tag';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function BlogPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { category, slug } = useParams();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => getBlogPost(slug!),
    initialData,
  });

  const mutation = useMutation({
    mutationFn: updateViews,
  });

  useEffect(() => {
    const originalTitle = document.title;

    mutation.mutate(data.data[0].id);
    document.title = data.data[0].attributes.title;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const convertedDate = convertDate(data.data[0].attributes.publishedAt);

  return (
    <>
      <div className="h-[64px]" />
      <div className="w-full flex flex-col">
        <div className="w-full max-w-[1440px] place-self-center py-6 px-6 lg:px-2 2xl:px-0 flex flex-col gap-6">
          <Breadcrumbs crumbs={[category!, data.data[0].attributes.title]} />
          {isPending ? (
            <PostLoader />
          ) : (
            !error && (
              <div className="flex flex-col items-center gap-6">
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
                <p className="lg:w-3/5 text-lg">
                  <ReactMarkdown>
                    {data.data[0].attributes.intro || ''}
                  </ReactMarkdown>
                </p>
                <div className="h-64 lg:h-96 w-full lg:w-1/2 rounded-md overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={
                      data.data[0].attributes.placeholderThumbnail ??
                      `http://localhost:1337${data.data[0].attributes.thumbnail!.data.attributes.url}`
                    }
                  />
                </div>
                <div className="lg:w-3/5 text-lg prose">
                  <ReactMarkdown>
                    {data.data[0].attributes.article}
                  </ReactMarkdown>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
