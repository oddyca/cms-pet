import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createDraft } from '@/services/updateServices';
import { setPostInfo } from '@/state/store/slices/postEditSlice';

import { RootState } from '@/state/store/store';

import Editor from '@/components/Dashboard/TextEditor/Editor';
import CopyIcon from '@/assets/CopyIcon';
import CheckIcon from '@/assets/CheckIcon';
import SelectImage from '../SelectImage/SelectImage';

export default function CreatePost() {
  const dispatch = useDispatch();
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Create New Post | ${originalTitle}`;

    return () => {
      document.title = originalTitle;
    };
  }, []);
  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const [isDraftCreated, setIsDraftCreated] = useState(false);

  const introText = useSelector(
    (state: RootState) => state.postEditSlice.value.intro,
  );
  const contentText = useSelector(
    (state: RootState) => state.postEditSlice.value.content,
  );
  const category = useSelector(
    (state: RootState) => state.postEditSlice.value.tag,
  );
  const authorStore = useSelector(
    (state: RootState) => state.postEditSlice.value.author,
  );
  const titleStore = useSelector(
    (state: RootState) => state.postEditSlice.value.title,
  );

  const handleCopy = (type: string) => {
    if (type === 'intro') {
      navigator.clipboard.writeText(introText!);
      setIsIntroCopied(true);
      setTimeout(() => {
        setIsIntroCopied(false);
      }, 250);
    } else {
      navigator.clipboard.writeText(contentText!);
      setIsContentCopied(true);
      setTimeout(() => {
        setIsContentCopied(false);
      }, 250);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    dispatch(setPostInfo({ title: e.target.value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    dispatch(setPostInfo({ author: e.target.value }));
  };

  const handleCreateDraft = () => {
    const newPostData = {
      title: titleStore,
      author: authorStore,
      tag: category,
      intro: introText,
      content: contentText,
      publishedAt: null,
    };

    createDraft(newPostData).then((res) => {
      if (res!.ok) {
        setIsDraftCreated(true);
      }
    });
  };

  return (
    <div className="flex gap-4">
      <div className="basis-1/5 min-h-32 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
        <SelectImage defaultImage={''} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-12">
          <p className="col-span-1">Title</p>
          <textarea
            className="resize-none col-span-11 max-h-8 h-8 px-2 rounded border border-1 border-gray-300"
            onChange={handleTitleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-12">
          <p className="col-span-1">Author</p>
          <textarea
            className="resize-none col-span-11 max-h-8 h-8 px-2 rounded border border-1 border-gray-300"
            onChange={handleAuthorChange}
          ></textarea>
        </div>
        <div className="flex-grow grid grid-cols-12 min-h-0 basis-1/3">
          <div className="col-span-1">
            <p>Intro</p>
            <p className="text-gray-400">(optional)</p>
          </div>
          <Editor type="intro" />
          <div
            onClick={() => handleCopy('intro')}
            className="relative border border-2 p-2 rounded border-gray-300 hover:border-gray-400 hover:cursor-pointer col-span-1 justify-self-center place-self-start"
          >
            <CopyIcon />
            {isIntroCopied && (
              <div className="absolute grid place-items-center inset-0 bg-white/[0.7] text-sm duration-100">
                <CheckIcon color="zinc-300" />
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow grid grid-cols-12 min-h-0 basis-2/3">
          <p className="col-span-1">Content</p>
          <Editor type="content" />
          <div
            onClick={() => handleCopy('content')}
            className="relative border border-2 p-2 rounded border-gray-300 hover:border-gray-400 hover:cursor-pointer col-span-1 justify-self-center place-self-start"
          >
            <CopyIcon />
            {isContentCopied && (
              <div className="absolute inset-0 bg-white/[0.7] text-sm duration-150">
                <CheckIcon color="zinc-300" />
              </div>
            )}
          </div>
        </div>

        <button
          className="rounded border border-1 border-gray-300 px-4 py-2"
          onClick={() => {
            handleCreateDraft();
          }}
        >
          CREATE DRAFT
        </button>
        <button
          disabled={!isDraftCreated}
          className="rounded border border-1 border-gray-300 px-4 py-2 enabled:cursor-pointer disabled:opacity-75"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
