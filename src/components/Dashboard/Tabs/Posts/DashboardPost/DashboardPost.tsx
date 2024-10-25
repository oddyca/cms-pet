import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';

import { blogPost, convertDate } from '@/controller/controller';
import { TAllPosts } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import Button from '../Button/Button';
import EditIcon from '@/assets/EditIcon';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/Tiptap/Editor';

export default function DashboardPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
    initialData,
  });

  console.log('DATA ', data.data[0].attributes);

  return (
    <>
      <div className="w-full min-h-full p-4 overflow-y-auto flex gap-4">
        {isPending ? (
          <PostLoader />
        ) : (
          !error && (
            <>
              <div className="basis-1/4 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
                <img
                  className="w-full object-cover"
                  loading="lazy"
                  src={
                    data.data[0].attributes.placeholderThumbnail ??
                    `http://localhost:1337${data.data[0].attributes.thumbnail!.data[0].attributes.url}`
                  }
                />
                <div className="hidden absolute inset-0 group-hover:flex group-hover:bg-white/[0.7] justify-center items-center z-10">
                  <div className="self-center flex gap-2 items-center">
                    <EditIcon color="gray-500" />
                    <p className="font-semibold text-gray-500">CHANGE IMAGE</p>
                  </div>
                </div>
              </div>
              <div className="basis-2/4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <Button bg="black" btn="Preview" />
                  <div className="flex gap-6">
                    <Button btn="Cancel" />
                    <Button bg="accent-purple-300" btn="Save Changes" />
                  </div>
                </div>
                <div className="h-full w-full border border-1 border-gray-300">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-evenly gap-2">
                      <p>Title</p>
                      <textarea className="w-full border border-1 border-gray-400 rounded">
                        {data.data[0].attributes.title}
                      </textarea>
                    </div>
                    <div className="flex gap-4">
                      <p>Category</p>
                      <select className="border border-1 border-gray-400 rounded">
                        <option>{data.data[0].attributes.tag}</option>
                      </select>
                    </div>
                    <div className="flex justify-evenly items-start gap-2">
                      <p>Content</p>
                      <Editor content={data.data[0].attributes.article} />
                      <button className="border border-1 border-gray-400 rounded p-1">
                        <CopyIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" basis-1/4 flex flex-col gap-4">
                <p className="self-end">Post Information</p>
                <div className="rounded centrif shadow-centrif flex flex-col gap-2 py-4 px-2">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Published</p>
                    <p>{convertDate(data.data[0].attributes.publishedAt)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Author</p>
                    <p>{data.data[0].attributes.author}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Edited</p>
                    <p>{data.data[0].attributes?.edited ?? '-'}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Views</p>
                    <p>{data.data[0].attributes.views ?? '0'}</p>
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
