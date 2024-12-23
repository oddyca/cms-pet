import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBlogPost } from '@/services/fetchServices';
import { allTagsSet } from '@/utils/allTagsSet';
import { TAllPosts } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/TextEditor/Editor';
import PreviewModal from '../Modals/PreviewModal';
import Dropdown from '@/components/Dropdown/Dropdown';

// Store
import { RootState } from '@/state/store/store';
import { setPostInfo, resetPostInfo } from '@/state/store/slices/postEditSlice';
import SelectImage from '../SelectImage/SelectImage';
import CheckIcon from '@/assets/CheckIcon';
import ConfirmModal from '../Modals/ConfirmModal';
import PostInfo from './PostInfo';
import ButtonsPanel from './ButtonsPanel';

export default function DashboardPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [successfulReqMessage, setSuccessfulReqMessage] = useState('');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isIntroAdded, setIsIntroAdded] = useState(false);

  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => getBlogPost(slug!),
    initialData,
  });

  // Fetched post data
  const post = data.data[0].attributes;

  const img =
    post.placeholderThumbnail ??
    `http://localhost:1337${post.thumbnail!.data.attributes.url}`;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Editing | ${data.data[0].attributes.title}`;

    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsPreviewModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Getting and filtering all categories (tags)
    allTagsSet().then((res) => setAllCategories([...res]));

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.title = originalTitle;

      dispatch(resetPostInfo());
    };
  }, []);

  // Modal func
  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  // store states
  const introText = useSelector(
    (state: RootState) => state.postEditSlice.value.intro,
  );
  const contentText = useSelector(
    (state: RootState) => state.postEditSlice.value.content,
  );
  const category = useSelector(
    (state: RootState) => state.dashboardCategoryFilter.value,
  );
  const storeImage = useSelector(
    (state: RootState) => state.updateImageSlice.value.image,
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

  return (
    <>
      <div className="relative w-full h-full min-h-0 p-2 2xl:p-4">
        {isPreviewModalOpen && (
          <PreviewModal
            ref={modalRef}
            setIsModalOpen={setIsPreviewModalOpen}
            postData={post}
            intro={introText || ''}
            content={contentText}
          />
        )}
        {isConfirmModalOpen && (
          <ConfirmModal
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            setIsConfirmed={setIsConfirmed}
          />
        )}
        {isPending ? (
          <PostLoader />
        ) : (
          !error && (
            <div className="flex flex-col gap-4 w-full h-full">
              <div className="grid grid-cols-12 w-full h-fit gap-2">
                <div className="col-span-2" />
                <div className="col-span-7 place-self-end">
                  <ButtonsPanel
                    handlePreviewClick={handlePreviewClick}
                    setSuccessfulReqMessage={setSuccessfulReqMessage}
                    category={category}
                    post={post}
                    introText={introText}
                    contentText={contentText}
                    imageURL={storeImage}
                    postID={data.data[0].id}
                  />
                </div>
                <div className="col-span-3" />
              </div>

              <div className="w-full h-full min-h-0 grid grid-cols-12 gap-2 2xl:gap-4">
                <div className="col-span-2 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
                  <SelectImage defaultImage={img} />
                </div>
                <div className="col-span-8 2xl:col-span-7 flex flex-col w-full h-full min-h-0 gap-2">
                  <div className="grid grid-cols-12">
                    <p className="col-span-2 text-sm xl:text-base">Title</p>
                    <textarea className="resize-none col-span-9 h-full xl:max-h-8 xl:h-8 px-2 rounded border border-1 border-gray-300">
                      {post.title}
                    </textarea>
                  </div>
                  <div className="grid grid-cols-12">
                    <p className="col-span-2 text-sm xl:text-base">Category</p>
                    <div className="rounded border border-1 border-gray-300 px-2 py-1 w-fit">
                      <Dropdown
                        menuOptions={allCategories}
                        defaultCat={category || post.tag}
                      />
                    </div>
                  </div>
                  {post.intro || isIntroAdded ? (
                    <div className="flex-grow grid gap-2 grid-cols-12 min-h-0 basis-1/3">
                      <div className="col-span-2 text-sm xl:text-base">
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
                  ) : (
                    <button
                      onClick={() => setIsIntroAdded(true)}
                      className="self-center border-dashed border-2 border-gray-300 rounded px-8 py-2 hover:border-gray-400"
                    >
                      + Add Intro
                    </button>
                  )}
                  <div className="flex-grow grid grid-cols-12 min-h-0 h-full basis-2/3">
                    <p className="col-span-2 text-sm xl:text-base">Content</p>
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
                <PostInfo
                  postID={data.data[0].id}
                  post={post}
                  setIsConfirmModalOpen={setIsConfirmModalOpen}
                  isConfirmed={isConfirmed}
                />
              </div>
            </div>
          )
        )}
        <div
          className={
            successfulReqMessage.length > 0
              ? 'fixed bottom-6 right-6 rounded border border-1 border-green-600 px-6 py-2 duration-300 bg-green-600 text-white shadow-centrif'
              : 'fixed bottom-6 right-6 border-1 px-6 py-2 duration-300 opacity-0'
          }
        >
          {successfulReqMessage}
        </div>
      </div>
    </>
  );
}
