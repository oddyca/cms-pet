import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { blogPost, convertDate } from '@/controller/controller';
import { TAllPosts } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import Button from '../Button/Button';
import EditIcon from '@/assets/EditIcon';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/TextEditor/Editor';
import BinIcon from '@/assets/BinIcon';

// Store
import { RootState, store } from '@/controller/store/store';
import { setPostInfo } from '@/controller/store/slices/postEditSlice';

export default function DashboardPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const dispatch = useDispatch();

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
    initialData,
  });

  // Fetched post data
  const post = data.data[0].attributes;

  useEffect(() => {
    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));
  }, []);

  const isEdited = useSelector(
    (state: RootState) => state.postEditSlice.value.isEdited,
  );

  // Copy functions
  const handleIntroCopy = () => {
    const postIntro = store.getState().postEditSlice.value.intro;

    navigator.clipboard.writeText(postIntro!);
    setIsIntroCopied(true);
    setTimeout(() => {
      setIsIntroCopied(false);
    }, 150);
  };

  const handleContentCopy = () => {
    const postContent = store.getState().postEditSlice.value.content;

    navigator.clipboard.writeText(postContent!);
    setIsContentCopied(true);
    setTimeout(() => {
      setIsContentCopied(false);
    }, 150);
  };

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
                  <Button bg="black" btn="Preview" disabled={false} />
                  <div className="flex gap-6">
                    <Button btn="Cancel" disabled={!isEdited} />
                    <Button
                      bg="accent-purple-300"
                      btn="Save Changes"
                      disabled={!isEdited}
                    />
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
                {post.intro ? (
                  <div className="flex-grow grid grid-cols-12 min-h-0 basis-1/3">
                    <div className="col-span-1">
                      <p>Intro</p>
                      <p className="text-gray-400">(optional)</p>
                    </div>
                    <Editor content={post.intro} type="intro" />
                    <div
                      onClick={handleIntroCopy}
                      className="relative border border-2 p-2 rounded border-gray-300 hover:border-gray-400 hover:cursor-pointer col-span-1 justify-self-center place-self-start"
                    >
                      <CopyIcon />
                      {isIntroCopied && (
                        <div className="absolute inset-0 bg-white/[0.7] text-sm duration-150">
                          Copied
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button className="self-center border-dashed border-2 border-gray-300 rounded px-8 py-2 hover:border-gray-400">
                    + Add Intro
                  </button>
                )}
                <div className="flex-grow grid grid-cols-12 min-h-0 basis-2/3">
                  <p className="col-span-1">Content</p>
                  <Editor content={post.article} type="content" />
                  <div
                    onClick={handleContentCopy}
                    className="relative border border-2 p-2 rounded border-gray-300 hover:border-gray-400 hover:cursor-pointer col-span-1 justify-self-center place-self-start"
                  >
                    <CopyIcon />
                    {isContentCopied && (
                      <div className="absolute inset-0 bg-white/[0.7] text-sm duration-150">
                        Copied
                      </div>
                    )}
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
                <button className="flex justify-center items-center gap-2 w-full py-2 rounded font-bold text-white bg-red-600 hover:bg-red-400">
                  <BinIcon color="white" />
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
