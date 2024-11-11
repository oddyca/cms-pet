import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  blogPost,
  convertDate,
  convertDateDashboard,
  deletePost,
  updateEntry,
} from '@/controller/controller';
import { TAllPosts } from '@/types/types';

import PostLoader from '@/components/Blog/Loaders/PostLoader';
import Button from '../Button/Button';
import CopyIcon from '@/assets/CopyIcon';
import Editor from '@/components/Dashboard/TextEditor/Editor';
import BinIcon from '@/assets/BinIcon';
import PreviewModal from '../Modals/PreviewModal';

// Store
import { RootState } from '@/controller/store/store';
import {
  setPostInfo,
  setIsEdited,
} from '@/controller/store/slices/postEditSlice';
import SelectImage from '../SelectImage/SelectImage';
import CheckIcon from '@/assets/CheckIcon';
import ConfirmModal from '../Modals/ConfirmModal';

export default function DashboardPost() {
  const navigate = useNavigate();
  const initialData = useLoaderData() as TAllPosts;
  const { slug } = useParams();

  // States
  const [isIntroCopied, setIsIntroCopied] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [successfulReqMessage, setSuccessfulReqMessage] = useState('');
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.title = originalTitle;
    };
  }, []);

  // Modal func
  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const isEdited = useSelector(
    (state: RootState) => state.postEditSlice.value.isEdited,
  );

  const introText = useSelector(
    (state: RootState) => state.postEditSlice.value.intro,
  );
  const contentText = useSelector(
    (state: RootState) => state.postEditSlice.value.content,
  );

  // Copy function
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

  const handleSaveChanges = async () => {
    const updatedPostData = {
      title: post.title,
      category: 'testCategoryUpdate',
      intro: introText || '',
      article: contentText,
      edited: new Date(),
    };
    try {
      await updateEntry({
        entryID: data.data[0].id,
        entryData: updatedPostData,
      });
      setSuccessfulReqMessage('Changes Saved!');
      dispatch(setIsEdited({ bool: false }));
      setTimeout(() => setSuccessfulReqMessage(''), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    dispatch(setPostInfo({ type: 'intro', text: post.intro }));
    dispatch(setPostInfo({ type: 'content', text: post.article }));
    dispatch(setIsEdited({ bool: false }));
  };

  const handleDelete = async () => {
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      deletePost(data.data[0].id).then((res) => {
        if (res!.ok) {
          setSuccessfulReqMessage(res!.statusText);
          navigate('/dashboard/posts');
        } else {
          setSuccessfulReqMessage(res!.statusText);
        }
      });
    }
  }, [isConfirmed]);

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
                    disabled={!isEdited}
                    onClick={handleCancel}
                  />
                  <Button
                    bg="accent-purple-300"
                    btn="Save Changes"
                    disabled={!isEdited}
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
              <div className=" basis-1/4 flex flex-col gap-4">
                <p className="self-end">Post Information</p>
                <div className="rounded shadow-centrif flex flex-col gap-2 py-4 px-2">
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
                    <p className="text-right">
                      {convertDateDashboard(post.edited) ?? '-'}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">Views</p>
                    <p>{post.views ?? '0'}</p>
                  </div>
                </div>
                <button
                  className="flex justify-center items-center gap-2 w-full py-2 rounded font-bold text-white bg-red-600 hover:bg-red-400"
                  onClick={handleDelete}
                >
                  <BinIcon color="white" />
                  DELETE POST
                </button>
              </div>
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
