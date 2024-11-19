import { useQuery, useMutation } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { blogPost, getAllTags } from '@/services/fetchServices';
import { updateEntry } from '@/services/updateServices';
import { useHashText } from '@/hooks/useHashText';
import { TAllPosts, TTag } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import Button from '../Button/Button';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/TextEditor/Editor';
import PreviewModal from '../Modals/PreviewModal';
import Loader from '@/components/Dashboard/Loader';
import Dropwdown from '@/components/Dropdown/Dropwdown';

// Store
import { RootState } from '@/state/store/store';
import { setPostInfo } from '@/state/store/slices/postEditSlice';
import SelectImage from '../SelectImage/SelectImage';
import CheckIcon from '@/assets/CheckIcon';
import ConfirmModal from '../Modals/ConfirmModal';
import { setCategory } from '@/state/store/slices/dashboardFilterSlice';
import PostInfo from './PostInfo';

export default function DashboardPost() {
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  // States
  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [successfulReqMessage, setSuccessfulReqMessage] = useState('');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const { isPending, error, data } = useQuery<TAllPosts>({
    queryKey: ['post', slug],
    queryFn: () => blogPost(slug!),
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
    const categoriesSet = new Set<string>();

    getAllTags().then((res) => {
      res.data.map((tag: TTag) => {
        const capFirstLetter =
          tag.attributes.tag.charAt(0).toUpperCase() +
          tag.attributes.tag.slice(1);

        categoriesSet.add(capFirstLetter);
      });
      setAllCategories([...categoriesSet]);
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.title = originalTitle;
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

  const mutationUpdateEntry = useMutation({
    mutationFn: updateEntry,
  });

  // Save changes
  const handleSaveChanges = () => {
    const updatedPostData = {
      title: post.title,
      tag: category || post.tag,
      intro: introText || '',
      article: contentText,
      edited: new Date(),
    };
    try {
      mutationUpdateEntry.mutate({
        entryID: data.data[0].id,
        entryData: updatedPostData,
      });
      if (mutationUpdateEntry.isSuccess) {
        setSuccessfulReqMessage('Changes Saved!');
      }
      setTimeout(() => setSuccessfulReqMessage(''), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));
    dispatch(setCategory(post.tag));
  };

  const initialDataRef = useRef({
    intro: post.intro,
    content: post.article,
    category: post.tag,
  });

  const isIntroEdited =
    initialDataRef.current.intro &&
    useHashText(introText || initialDataRef.current.intro) !==
      useHashText(initialDataRef.current.intro);

  const isContentEdited =
    initialDataRef.current.content &&
    useHashText(contentText || initialDataRef.current.content) !==
      useHashText(initialDataRef.current.content);

  const isCategoryEdited =
    category !== '' && category !== initialDataRef.current.category;

  const isEdited =
    initialDataRef.current.intro !== undefined &&
    initialDataRef.current.content !== undefined &&
    (isIntroEdited || isContentEdited || isCategoryEdited);

  return (
    <>
      <div className="relative w-full h-full min-h-0 p-4 flex gap-4">
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
            <>
              <div className="basis-1/5 h-fit rounded border-dashed border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer p-4 group relative">
                <SelectImage id={data.data[0].id} defaultImage={img} />
              </div>
              <div className="flex flex-col h-full items-evenly w-full min-h-0 gap-2">
                <div className="flex justify-end gap-4">
                  <Button
                    btn="Preview"
                    disabled={false}
                    onClick={handlePreviewClick}
                  />
                  <Button
                    btn="Cancel"
                    disabled={!isEdited || mutationUpdateEntry.isPending}
                    onClick={handleCancel}
                  />
                  <Button
                    bg="accent-purple-300"
                    btn={
                      mutationUpdateEntry.isPending ? (
                        <Loader />
                      ) : (
                        'Save Changes'
                      )
                    }
                    disabled={!isEdited || mutationUpdateEntry.isPending}
                    onClick={handleSaveChanges}
                  />
                </div>
                <div className="grid grid-cols-12">
                  <p className="col-span-1">Title</p>
                  <textarea className="resize-none col-span-11 max-h-8 h-8 px-2 rounded border border-1 border-gray-300">
                    {post.title}
                  </textarea>
                </div>
                <div className="grid grid-cols-12">
                  <p className="col-span-1">Category</p>
                  <div className="rounded border border-1 border-gray-300 px-2 py-1 w-fit">
                    <Dropwdown
                      menuOptions={allCategories}
                      defaultCat={category || post.tag}
                    />
                  </div>
                </div>
                {post.intro ? (
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
                ) : (
                  <button className="self-center border-dashed border-2 border-gray-300 rounded px-8 py-2 hover:border-gray-400">
                    + Add Intro
                  </button>
                )}
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
              </div>
              <PostInfo
                postID={data.data[0].id}
                post={post}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                isConfirmed={isConfirmed}
              />
            </>
          )
        )}
        <div
          className={
            successfulReqMessage
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
