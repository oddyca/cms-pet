import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';

import { blogPost, convertDate } from '@/controller/controller';
import { TAllPosts } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import Button from '../Button/Button';
import EditIcon from '@/assets/EditIcon';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/TextEditor/Editor';

export default function DashboardPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
    initialData,
  });

  const post = data.data[0].attributes;

  return (
    <>
      <div className="w-full h-full min-h-0 p-4 flex gap-4">
        {isPending ? (
          <PostLoader />
        ) : (
          !error && (
            <>
              <div className="basis-1/5 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
                <img
                  className="w-full object-cover"
                  loading="lazy"
                  src={
                    post.placeholderThumbnail ??
                    `http://localhost:1337${post.thumbnail!.data[0].attributes.url}`
                  }
                />
                <div className="hidden absolute inset-0 group-hover:flex group-hover:bg-white/[0.7] justify-center items-center z-10">
                  <div className="self-center flex gap-2 items-center">
                    <EditIcon color="gray-500" />
                    <p className="font-semibold text-gray-500">CHANGE IMAGE</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full items-evenly w-full min-h-0 gap-2">
                <div className="flex justify-between">
                  <Button bg="black" btn="Preview" />
                  <div className="flex gap-6">
                    <Button btn="Cancel" />
                    <Button bg="accent-purple-300" btn="Save Changes" />
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <p className="col-span-1">Title</p>
                  <textarea className="resize-none col-span-11 max-h-8 h-8 px-2 rounded border border-1 border-gray-300">
                    {post.title}
                  </textarea>
                </div>
                <div className="grid grid-cols-12">
                  <p className="col-span-1">Category</p>
                  <select className="rounded border border-1 border-gray-300 px-2">
                    <option>Ideas</option>
                  </select>
                </div>
                <div className="flex-grow grid grid-cols-12 min-h-0">
                  <p className="col-span-1">Content</p>
                  <Editor content={post.article} />
                  <div className="border border-2 p-2 rounded border-gray-300 hover:border-gray-400 col-span-1 justify-self-center place-self-start">
                    <CopyIcon />
                  </div>
                </div>
              </div>
              <div className=" basis-1/4 flex flex-col gap-4">
                <p className="self-end">Post Information</p>
                <div className="rounded centrif shadow-centrif flex flex-col gap-2 py-4 px-2">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Published</p>
                    <p>{convertDate(post.publishedAt)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Author</p>
                    <p>{post.author}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Edited</p>
                    <p>{post?.edited ?? '-'}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Views</p>
                    <p>{post.views ?? '0'}</p>
                  </div>
                </div>
                <button className="w-full py-2 rounded font-bold text-white bg-red-600 hover:bg-red-400">
                  DELETE POST
                </button>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}
