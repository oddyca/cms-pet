import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { createDraft } from '@/services/updateServices';
import { setPostInfo } from '@/state/store/slices/postEditSlice';
import { allTagsSet } from '@/utils/allTagsSet';
import { TCreatePostForm } from '@/types/types';
import { RootState } from '@/state/store/store';

import Editor from '@/components/Dashboard/TextEditor/Editor';
import CopyIcon from '@/assets/CopyIcon';
import CheckIcon from '@/assets/CheckIcon';
import SelectImage from '../SelectImage/SelectImage';
import CreatePostButtonPanel from './CreatePostButtonPanel';
import SchedulePost from './SchedulePost';
import PreviewModal from '../Modals/PreviewModal';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function CreatePost() {
  const dispatch = useDispatch();
  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const [isDraftCreated, setIsDraftCreated] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Create New Post | ${originalTitle}`;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsPreviewModalOpen(false);
      }
    };

    // Getting and filtering all categories (tags)
    allTagsSet().then((res) => setAllCategories([...res]));

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const introText = useSelector(
    (state: RootState) => state.postEditSlice.value.intro,
  );
  const contentText = useSelector(
    (state: RootState) => state.postEditSlice.value.content,
  );
  const category = useSelector(
    (state: RootState) => state.dashboardCategoryFilter.value,
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

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TCreatePostForm>();

  const handleFormSubmit: SubmitHandler<TCreatePostForm> = () => {
    handleCreateDraft();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { title, author } = getValues();
    dispatch(
      setPostInfo({
        title: title,
        author: author,
        category: category,
      }),
    );
  };

  useEffect(() => {
    setValue('category', category);
    setValue('content', contentText);
  }, [category, contentText]);

  return (
    <div className=" w-full p-4">
      {isPreviewModalOpen && (
        <PreviewModal
          ref={modalRef}
          setIsModalOpen={setIsPreviewModalOpen}
          postData={{
            title: titleStore,
            author: authorStore,
            tag: category,
            intro: introText,
            article: contentText,
            slug: '',
            publishedAt: `${new Date()}`,
            placeholderThumbnail: '',
          }}
          intro={introText || ''}
          content={contentText}
        />
      )}
      <form
        className="flex flex-col gap-4 h-full"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="grid grid-cols-12 w-full min-h-0 gap-2">
          <div className="col-span-3" />
          <CreatePostButtonPanel
            isDraftCreated={isDraftCreated}
            handlePreviewClick={handlePreviewClick}
          />
          <div className="col-span-3" />
        </div>

        <div className="w-full h-full grid grid-cols-12 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="w-full min-h-32 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
              <SelectImage defaultImage="" register={register} />
            </div>
            <p className="text-red-600 text-center">
              {errors.img && errors.img.message}
            </p>
          </div>
          <div className="col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-2">
              <p className="col-span-1">Title</p>
              <div className="col-span-11 flex gap-4 items-center">
                <input
                  className="resize-none col-span-11 max-h-8 h-8 w-1/2 px-2 rounded border border-1 border-gray-300"
                  {...register('title', {
                    required: 'Title is required.',
                    onChange: handleChange,
                  })}
                ></input>
                <p className="text-red-600">
                  {errors.title && errors.title.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-1">Category</p>
              <div className="flex gap-2 items-center col-span-8 ">
                <div className="rounded border border-1 border-gray-300 px-2 py-1 w-fitflex">
                  <Dropdown
                    menuOptions={allCategories}
                    defaultCat={category || 'Select a category'}
                  />
                  <input
                    type="hidden"
                    {...register('category', {
                      required: 'Category is required.',
                    })}
                    value={category}
                  />
                </div>
                <p className="text-red-600">
                  {errors.category && errors.category.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <p className="col-span-1">Author</p>
              <div className="col-span-11 flex gap-4 items-center">
                <input
                  className="resize-none col-span-11 max-h-8 h-8 w-1/2 px-2 rounded border border-1 border-gray-300"
                  {...register('author', {
                    required: 'Author is required.',
                    onChange: handleChange,
                  })}
                ></input>
                <p className="text-red-600">
                  {errors.author && errors.author.message}
                </p>
              </div>
            </div>
            <div className="flex-grow grid grid-cols-12 gap-2 min-h-0 basis-1/3">
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
            <div className="flex-grow grid grid-cols-12 gap-2 min-h-0 basis-2/3">
              <div className="col-span-1 flex flex-col gap-2 items-end">
                <p className="">Content</p>
                <input
                  type="hidden"
                  {...register('content', {
                    required: 'Content field is required.',
                  })}
                  value={contentText}
                />
                {errors.content && (
                  <p className="text-red-600">{errors.content.message}</p>
                )}
              </div>
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
          </div>
          <SchedulePost setValue={setValue} />
        </div>
      </form>
    </div>
  );
}
