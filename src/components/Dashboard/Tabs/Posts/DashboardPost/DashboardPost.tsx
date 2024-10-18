import PostLoader from '@/components/Blog/Loaders/PostLoader';
import { blogPost, convertDate } from '@/controller/controller';
import { TAllPosts } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import Tag from '../PostCard/PostTag';
import ReactMarkdown from 'react-markdown';

export default function DashboardPost() {
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
        <div className="w-full max-w-[1440px] place-self-center py-6 flex flex-col gap-6">
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
                    <Tag tag={data.data[0].attributes.tag} />
                  </div>
                </div>
                <p className="lg:w-3/5 text-lg">
                  {data.data[0].attributes.intro || ''}
                </p>
                <div className="h-96 w-1/2 rounded-md overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={
                      data.data[0].attributes.placeholderThumbnail ??
                      `http://localhost:1337${data.data[0].attributes.thumbnail!.data[0].attributes.url}`
                    }
                  />
                </div>
                <div className="lg:w-3/5 text-lg prose">
                  <ReactMarkdown className="">
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