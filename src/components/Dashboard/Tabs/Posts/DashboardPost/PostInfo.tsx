import React, { useEffect } from 'react';

import Loader from '@/components/Dashboard/Loader';
import BinIcon from '@/assets/BinIcon';

import { convertDate, convertDateDashboard } from '@/utils/dateUtils';
import { deletePost } from '@/services/updateServices';
import { TPost } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function PostInfo({
  postID,
  post,
  setIsConfirmModalOpen,
  isConfirmed,
}: {
  postID: number;
  post: TPost['attributes'];
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmed: boolean;
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsConfirmModalOpen(true);
  };

  const mutationDeleteEntry = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      navigate('/dashboard/posts');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
    },
  });

  useEffect(() => {
    if (isConfirmed) {
      mutationDeleteEntry.mutate(postID);
    }
  }, [isConfirmed]);
  return (
    <div className="col-span-3 flex flex-col gap-4">
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
        {mutationDeleteEntry.isPending ? (
          <Loader />
        ) : (
          <>
            <BinIcon color="white" />
            DELETE POST
          </>
        )}
      </button>
    </div>
  );
}
